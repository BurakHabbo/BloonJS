import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';

export default class RoomPaintComposer extends MessageComposer {
	private type: string;
	private value: string;

	public constructor(type: string, value: string){
		super();
		this.type = type;
		this.value = value;
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.RoomPaintComposer);
		this.response.appendString(this.type.toString());
		this.response.appendString(this.value.toString()+".0");

		return this.response;
	}
}