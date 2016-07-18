import Emulator from '../../Emulator';
import RoomCategory from './RoomCategory';
import RoomLayout from './RoomLayout';
import Room from './Room';
import GameClient from '../GameClients/GameClient';
import Habbo from '../Users/Habbo';
import Tile from '../../Util/Pathfinding/Tile';
import RoomState from './RoomState';
import RoomUnit from './RoomUnit';
import RoomEnterErrorComposer from '../../Messages/Outgoing/Rooms/RoomEnterErrorComposer';
import RoomOpenComposer from '../../Messages/Outgoing/Rooms/RoomOpenComposer';
import RoomModelComposer from '../../Messages/Outgoing/Rooms/RoomModelComposer';
import RoomPaintComposer from '../../Messages/Outgoing/Rooms/RoomPaintComposer';

export default class RoomManager {
	private roomCategories: Array<RoomCategory>;
	private roomLayouts: Array<RoomLayout>;
	private activeRooms: Array<Room>;

	public constructor() {
		this.roomLayouts = new Array<RoomLayout>();
		this.activeRooms = new Array<Room>();
		this.loadRoomCategories();
		this.loadRoomModels();

		Emulator.getLogging().logStart("Room Manager -> Loaded!");
	}

	public loadRoomCategories(): void {
		this.roomCategories = Array<RoomCategory>();

		Emulator.getDatabase().getPool().getConnection(function(err, connection){
			connection.query('SELECT * FROM navigator_flatcats', function(err, rows){
				for(let i = 0; i < rows.length; i++){
					let row = rows[i];
					Emulator.getGameEnvironment().getRoomManager().putRoomCategory(<number>row.id, new RoomCategory(row));
				}

				connection.release();
			});
		});
	}

	public loadRoomModels(): void {
		this.roomLayouts = new Array<RoomLayout>();

		Emulator.getDatabase().getPool().getConnection(function(err, connection){
			connection.query('SELECT * FROM room_models', function(err, rows){
				for(let i = 0; i < rows.length; i++){
					let row = rows[i];
					Emulator.getGameEnvironment().getRoomManager().addRoomLayout(new RoomLayout(row));
				}

				connection.release();
			});
		});
	}

	public loadRoom(id: number, client: GameClient, cb: (room: Room, client: GameClient) => void): void {
		let room: Room = null;

		if(id in this.activeRooms){
			room = this.activeRooms[id];

			cb(room, client);
		}else{
			Emulator.getDatabase().getPool().getConnection(function(err, connection){
				connection.query('SELECT * FROM rooms WHERE id = ? LIMIT 1', [id], function(err, rows){
					if(rows.length == 1){
						let row = rows[0];
						room = new Room(row);
						cb(room, client);
					}else{
						cb(null, client);
					}

					connection.release();
				});
			});
		}
	}

	public putRoomCategory(id: number, category: RoomCategory): void {
		this.roomCategories[id] = category;
	}

	public addRoomLayout(layout: RoomLayout): void {
		this.roomLayouts.push(layout);
	}

	public getLayout(name: string): RoomLayout {
		for(let i = 0; i < this.roomLayouts.length; i++){
			if(name == this.roomLayouts[i].getName()){
				return this.roomLayouts[i];
			}
		}

		return null;
	}

	public enterRoom(habbo: Habbo, roomId: number, password: string, overrideChecks?: boolean, doorLocation?: Tile): void {
		if(overrideChecks == null){
			overrideChecks = false;
		}

		this.loadRoom(roomId, habbo.getClient(), function(room: Room, client: GameClient){
			if(room == null)
				return;
			//||(room.hasGuild() && room.guildRightLevel(habbo) > 2)) TODO
			if(overrideChecks || room.isOwner(client.getHabbo()) || room.getState() == RoomState.OPEN || room.getState() == RoomState.INVISIBLE || client.getHabbo().hasPermission("acc_anyroomowner") || client.getHabbo().hasPermission("acc_enteranyroom") || room.hasRights(client.getHabbo())){
				Emulator.getGameEnvironment().getRoomManager().openRoom(client.getHabbo(), room, doorLocation);
			}
		});
	}

	public openRoom(habbo: Habbo, room: Room, doorLocation: Tile): void {
		if(room == null)
			return;

		//if (Emulator.getConfig().getBoolean("hotel.room.enter.logs"))
			//this.logEnter(habbo, room);

		if(habbo.getRoomUnit() == null)
			habbo.setRoomUnit(new RoomUnit());

		if(room.isBanned(habbo)){
			habbo.getClient().sendResponse(new RoomEnterErrorComposer(RoomEnterErrorComposer.ROOM_ERROR_BANNED));
			return;
		}

		if(room.getUsersCount() >= room.getUsersMax() && !habbo.hasPermission("acc_fullrooms")){
			habbo.getClient().sendResponse(new RoomEnterErrorComposer(RoomEnterErrorComposer.ROOM_ERROR_GUESTROOM_FULL));
			return;
		}

		habbo.getRoomUnit().clearStatus();
		habbo.getClient().sendResponse(new RoomOpenComposer());
		habbo.getRoomUnit().setInRoom(true);
		habbo.getHabboInfo().setLoadingRoom(room.getId());
		habbo.getClient().sendResponse(new RoomModelComposer(room));

		if(room.getWallPaint() != "0.0")
			habbo.getClient().sendResponse(new RoomPaintComposer("wallpaper", room.getWallPaint()));

		if(room.getFloorPaint() != "0.0")
			habbo.getClient().sendResponse(new RoomPaintComposer("floor", room.getFloorPaint()));

		habbo.getClient().sendResponse(new RoomPaintComposer("landscape", room.getBackgroundPaint()));

		room.refreshRightsForHabbo(habbo);
	}
}