import * as Collections from 'typescript-collections';
import Node from './Node';
import Room from '../../HabboHotel/Rooms/Room';
import RoomUnit from '../../HabboHotel/Rooms/RoomUnit';
import GameMap from './GameMap';
import Pathfinding = require('pathfinding');

export default class PathFinder {
    private room: Room;
    private roomUnit: RoomUnit;
    private path: Array<Array<number>>;
    private pathfinder: Pathfinding.AStarFinder;

    public constructor(value1: RoomUnit | Room, value2?: RoomUnit) {
        if (value1 instanceof RoomUnit) {
            this.roomUnit = value1;
            this.room = null;
        } else if (value1 instanceof Room && value2 instanceof RoomUnit) {
            this.room = value1;
            this.roomUnit = value2;
        }

        this.pathfinder = new Pathfinding.AStarFinder({
            allowDiagonal: true
        });
    }

    public findPath(): void {
        this.path = this.calculatePath();
        this.path.shift();
    }

    public calculatePath(): Array<Array<number>> {
        if (this.room != null && this.roomUnit != null) {
            let gameMap: GameMap<Node> = this.room.getGameMap();

            if (gameMap != null) {
                let gridBackup: Pathfinding.Grid = gameMap.getGrid().clone();
                let nodes = this.pathfinder.findPath(this.roomUnit.getX(), this.roomUnit.getY(), this.roomUnit.getGoalX(), this.roomUnit.getGoalY(), gameMap.getGrid());
                gameMap.setGrid(gridBackup);

                if (nodes.length > 0) {
                    return nodes;
                }
            }
        }

        return new Array<Array<number>>();
    }

    public setRoom(room: Room): void {
        this.room = room;
    }

    public getPath(): Array<Array<number>> {
        return this.path;
    }
}
