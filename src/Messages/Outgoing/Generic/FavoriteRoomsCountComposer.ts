import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';

export default class FavoriteRoomsCountComposer extends MessageComposer {
	public constructor(){
		super();
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.FavoriteRoomsCountComposer);
		this.response.appendInt(30);
		this.response.appendInt(0);

		return this.response;
	}
}