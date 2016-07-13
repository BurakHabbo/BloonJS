import Emulator from '../../Emulator';
import RoomCategory from './RoomCategory';
import RoomLayout from './RoomLayout';
import Room from './Room';
import GameClient from '../GameClients/GameClient';

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
}