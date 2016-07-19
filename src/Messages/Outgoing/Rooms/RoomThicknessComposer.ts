import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Room from '../../../HabboHotel/Rooms/Room';

export default class RoomThicknessComposer extends MessageComposer {
	private room: Room;

	public constructor(room: Room){
		super();
		this.room = room;
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.RoomThicknessComposer);
		this.response.appendBoolean(this.room.isHideWall());
		this.response.appendInt(this.room.getWallSize());
		this.response.appendInt(this.room.getFloorSize());

		return this.response;
	}
}