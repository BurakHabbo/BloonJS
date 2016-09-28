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
import HotelViewComposer from '../../Messages/Outgoing/HotelView/HotelViewComposer';
import RoomUsersComposer from '../../Messages/Outgoing/Rooms/Users/RoomUsersComposer';
import RoomUserStatusComposer from '../../Messages/Outgoing/Rooms/Users/RoomUserStatusComposer';
import RoomPaneComposer from '../../Messages/Outgoing/Rooms/RoomPaneComposer';
import RoomThicknessComposer from '../../Messages/Outgoing/Rooms/RoomThicknessComposer';
import RoomDataComposer from '../../Messages/Outgoing/Rooms/RoomDataComposer';
import PathFinder from '../../Util/Pathfinding/PathFinder';
import RoomUserRotation from './RoomUserRotation';

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

        Emulator.getDatabase().getPool().getConnection(function(err, connection) {
            connection.query('SELECT * FROM navigator_flatcats', function(err, rows) {
                for (let i = 0; i < rows.length; i++) {
                    let row = rows[i];
                    Emulator.getGameEnvironment().getRoomManager().putRoomCategory(<number>row.id, new RoomCategory(row));
                }

                connection.release();
            });
        });
    }

    public roomCategoriesForHabbo(habbo: Habbo): Array<RoomCategory> {
        let categories: Array<RoomCategory> = new Array<RoomCategory>();

        let keys = Object.keys(this.roomCategories);

        for (let i = 0; i < keys.length; i++) {
            let category: RoomCategory = this.roomCategories[keys[i]];

            if (category.getMinRank() <= habbo.getHabboInfo().getRank())
                categories.push(category);
        }

        categories.sort(function(a: RoomCategory, b: RoomCategory) {
            if (a.getId() > b.getId()) {
                return 1;
            } else if (a.getId() < b.getId()) {
                return -1;
            } else {
                return 0;
            }
        });

        return categories;
    }

    public loadRoomModels(): void {
        this.roomLayouts = new Array<RoomLayout>();

        Emulator.getDatabase().getPool().getConnection(function(err, connection) {
            connection.query('SELECT * FROM room_models', function(err, rows) {
                for (let i = 0; i < rows.length; i++) {
                    let row = rows[i];
                    Emulator.getGameEnvironment().getRoomManager().addRoomLayout(new RoomLayout(row));
                }

                connection.release();
            });
        });
    }

    public loadRoom(id: number, client: GameClient, cb: (room: Room, client: GameClient) => void): void {
        let room: Room = null;

        if (id in this.activeRooms) {
            room = this.activeRooms[id];

            cb(room, client);
        } else {
            Emulator.getDatabase().getPool().getConnection(function(err, connection) {
                connection.query('SELECT * FROM rooms WHERE id = ? LIMIT 1', [id], function(err, rows) {
                    if (rows.length == 1) {
                        let row = rows[0];
                        room = new Room(row);
                        Emulator.getGameEnvironment().getRoomManager().addRoom(room);
                        cb(room, client);
                    } else {
                        cb(null, client);
                    }

                    connection.release();
                });
            });
        }
    }

    public addRoom(room: Room): void {
        this.activeRooms[room.getId()] = room;
    }

    public getRoom(id: number): Room {
        return this.activeRooms[id] ? this.activeRooms[id] : null;
    }

    public putRoomCategory(id: number, category: RoomCategory): void {
        this.roomCategories[id] = category;
    }

    public addRoomLayout(layout: RoomLayout): void {
        this.roomLayouts.push(layout);
    }

    public getLayout(name: string): RoomLayout {
        for (let i = 0; i < this.roomLayouts.length; i++) {
            if (name == this.roomLayouts[i].getName()) {
                return this.roomLayouts[i];
            }
        }

        return null;
    }

    public prepareRoom(habbo: Habbo, roomId: number, password: string, overrideChecks?: boolean, doorLocation?: Tile): void {
        if (overrideChecks == null) {
            overrideChecks = false;
        }

        this.loadRoom(roomId, habbo.getClient(), function(room: Room, client: GameClient) {
            if (room == null)
                return;
            //||(room.hasGuild() && room.guildRightLevel(habbo) > 2)) TODO
            if (overrideChecks || room.isOwner(client.getHabbo()) || room.getState() == RoomState.OPEN || room.getState() == RoomState.INVISIBLE || client.getHabbo().hasPermission("acc_anyroomowner") || client.getHabbo().hasPermission("acc_enteranyroom") || room.hasRights(client.getHabbo())) {
                Emulator.getGameEnvironment().getRoomManager().openRoom(client.getHabbo(), room, doorLocation);
            }
        });
    }

    public openRoom(habbo: Habbo, room: Room, doorLocation: Tile): void {
        if (room == null)
            return;

        //if (Emulator.getConfig().getBoolean("hotel.room.enter.logs"))
        //this.logEnter(habbo, room);

        if (habbo.getRoomUnit() == null)
            habbo.setRoomUnit(new RoomUnit());

        if (room.isBanned(habbo)) {
            habbo.getClient().sendResponse(new RoomEnterErrorComposer(RoomEnterErrorComposer.ROOM_ERROR_BANNED));
            return;
        }

        if (room.getUsersCount() >= room.getUsersMax() && !habbo.hasPermission("acc_fullrooms")) {
            habbo.getClient().sendResponse(new RoomEnterErrorComposer(RoomEnterErrorComposer.ROOM_ERROR_GUESTROOM_FULL));
            return;
        }

        habbo.getRoomUnit().clearStatus();
        habbo.getClient().sendResponse(new RoomOpenComposer());
        habbo.getRoomUnit().setInRoom(true);
        habbo.getHabboInfo().setLoadingRoom(room.getId());
        habbo.getClient().sendResponse(new RoomModelComposer(room));

        if (room.getWallPaint() != "0.0")
            habbo.getClient().sendResponse(new RoomPaintComposer("wallpaper", room.getWallPaint()));

        if (room.getFloorPaint() != "0.0")
            habbo.getClient().sendResponse(new RoomPaintComposer("floor", room.getFloorPaint()));

        habbo.getClient().sendResponse(new RoomPaintComposer("landscape", room.getBackgroundPaint()));

        room.refreshRightsForHabbo(habbo);
    }

    public enterRoom(habbo: Habbo, room: Room): void {
        if (habbo.getHabboInfo().getLoadingRoom() != room.getId()) {
            habbo.getClient().sendResponse(new HotelViewComposer());
            return;
        }

        habbo.getHabboInfo().setCurrentRoom(room);
        habbo.getRoomUnit().setHandItem(0);
        habbo.getRoomUnit().setEffectId(0);
        habbo.getRoomUnit().setPathFinder(new PathFinder(habbo.getRoomUnit()));

        if (!habbo.getRoomUnit().isTeleporting()) {
            habbo.getRoomUnit().setGoalLocation(room.getLayout().getDoorX(), room.getLayout().getDoorY());
            habbo.getRoomUnit().setX(room.getLayout().getDoorX());
            habbo.getRoomUnit().setY(room.getLayout().getDoorY());
            //habbo.getRoomUnit().setZ(room.getLayout().getDoorZ());
            habbo.getRoomUnit().setZ(0.0);
            habbo.getRoomUnit().setBodyRotation(RoomUserRotation.EAST);//room.getLayout().getDoorDirection()
            habbo.getRoomUnit().setHeadRotation(RoomUserRotation.EAST);//room.getLayout().getDoorDirection()
        }

        habbo.getRoomUnit().setPathFinderRoom(room);
        habbo.getRoomUnit().resetIdleTimer();
        room.addHabbo(habbo);
        habbo.getRoomUnit().setId(room.getUnitCounter());

        room.sendComposer(new RoomUsersComposer(habbo).compose());
        room.sendComposer(new RoomUserStatusComposer(habbo.getRoomUnit()).compose());

        habbo.getClient().sendResponse(new RoomUsersComposer(room.getCurrentHabbos()));
        habbo.getClient().sendResponse(new RoomUserStatusComposer(room.getCurrentHabbos()));

        habbo.getClient().sendResponse(new RoomPaneComposer(room, room.isOwner(habbo)));

        //habbo.getClient().sendResponse(new RoomWallItemsComposer(room));
        //habbo.getClient().sendResponse(new RoomFloorItemsComposer(room));
        habbo.getClient().sendResponse(new RoomThicknessComposer(room));

        habbo.getClient().sendResponse(new RoomDataComposer(room, habbo.getClient().getHabbo(), false, true));

        habbo.getHabboInfo().setLoadingRoom(0);
    }
}
