import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';

export default class UserHomeRoomComposer extends MessageComposer {
	private homeRoom: number;
	private newRoom: number;

	public constructor(homeRoom: number, newRoom: number){
		super();
		this.homeRoom = homeRoom;
		this.newRoom = newRoom;
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.UserHomeRoomComposer);
		this.response.appendInt(this.homeRoom);
		this.response.appendInt(this.newRoom);
		return this.response;
	}
}