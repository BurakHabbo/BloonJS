import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Room from '../../../HabboHotel/Rooms/Room';
import RoomTileState from '../../../HabboHotel/Rooms/RoomTileState';

export default class RoomHeightMapComposer extends MessageComposer {
	private room: Room;

	public constructor(room: Room){
		super();
		this.room = room;
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.RoomHeightMapComposer);
		this.response.appendBoolean(true);
		this.response.appendInt(this.room.getWallHeight());
		this.response.appendString(this.room.getLayout().getRelativeMap());
		return this.response;
	}
}