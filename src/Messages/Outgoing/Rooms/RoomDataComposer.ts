import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Room from '../../../HabboHotel/Rooms/Room';
import Habbo from '../../../HabboHotel/Users/Habbo';

export default class RoomDataComposer extends MessageComposer {
	private room: Room;
	private habbo: Habbo;
	private publicRoom: boolean;
	private unknown: boolean;

	public constructor(room: Room, habbo: Habbo, boolA: boolean, boolB: boolean){
		super();
		this.room = room;
		this.habbo = habbo;
		this.publicRoom = boolA;
		this.unknown = boolB;
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.RoomDataComposer);
		this.response.appendBoolean(this.unknown);
		this.response.appendInt(this.room.getId());
		this.response.appendString(this.room.getName());
		if(this.room.isPublicRoom()){
			this.response.appendInt(0);
			this.response.appendString("");
		}else{
			this.response.appendInt(this.room.getOwnerId());
			this.response.appendString(this.room.getOwnerName());
		}
		this.response.appendInt(<number>this.room.getState());
		this.response.appendInt(this.room.getUsersCount());
		this.response.appendInt(this.room.getUsersMax());
		return this.response;
	}
}