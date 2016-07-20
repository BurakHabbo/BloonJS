import * as Collections from 'typescript-collections';
import Node from './Node';
import Room from '../../HabboHotel/Rooms/Room';
import RoomUnit from '../../HabboHotel/Rooms/RoomUnit';
export default class PathFinder {
	private room: Room;
	private roomUnit: RoomUnit;
	private path: Collections.Queue<Node>;

	public constructor(value1: RoomUnit | Room, value2?: RoomUnit){
		if(value1 instanceof RoomUnit){
			this.roomUnit = value1;
			this.room = null;
		}else if(value1 instanceof Room && value2 instanceof RoomUnit){
			this.room = value1;
			this.roomUnit = value2;
		}
	}

	public findPath(): void {
		this.path = this.calculatePath();
	}

	public calculatePath(): Collections.Queue<Node> {
		if(this.room != null && this.roomUnit != null){

		}
		
		return new Collections.Queue<Node>();
	}
}