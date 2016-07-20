import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';
import Emulator from '../../../Emulator';

export default class NewNavigatorSavedSearchesComposer extends MessageComposer {
	public constructor(){
		super();
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.NewNavigatorSavedSearchesComposer);
		this.response.appendInt(4);

		this.response.appendInt(1);
		this.response.appendString("official");
		this.response.appendString("");
		this.response.appendString("");

		this.response.appendInt(2);
		this.response.appendString("recommended");
		this.response.appendString("");
		this.response.appendString("");

		this.response.appendInt(3);
		this.response.appendString("my");
		this.response.appendString("");
		this.response.appendString("");

		this.response.appendInt(4);
		this.response.appendString("favorites");
		this.response.appendString("");
		this.response.appendString("");

		return this.response;
	}
}