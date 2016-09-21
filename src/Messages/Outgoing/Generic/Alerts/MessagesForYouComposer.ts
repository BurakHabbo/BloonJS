import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import Habbo from '../../../../HabboHotel/Users/Habbo';

export default class MessagesForYouComposer extends MessageComposer {
	private messages: Array<string>;

	public constructor(messages: Array<string>){
		super();
		this.messages = messages;
	}

	public compose(): ServerMessage {
		this.response.init(Outgoing.MessagesForYouComposer);
		this.response.appendInt(this.messages.length);

		for(let i = 0; i < this.messages.length; i++){
			this.response.appendString(this.messages[i]);
		}

		return this.response;
	}
}