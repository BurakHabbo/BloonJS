import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';

export default class AuthenticationOKMessageComposer extends MessageComposer {
	public constructor(){
		super();
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.AuthenticationOKMessageComposer);
		return this.response;
	}
}