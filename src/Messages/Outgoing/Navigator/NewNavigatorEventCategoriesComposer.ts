import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';
import Emulator from '../../../Emulator';

export default class NewNavigatorEventCategoriesComposer extends MessageComposer {
	public constructor(){
		super();
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.NewNavigatorEventCategoriesComposer);
		this.response.appendInt(11);
		this.response.appendInt(1);
		this.response.appendString("Hottest Events");
		this.response.appendBoolean(false);
		this.response.appendInt(2);
		this.response.appendString("Parties & Music");
		this.response.appendBoolean(true);
		this.response.appendInt(3);
		this.response.appendString("Role Play");
		this.response.appendBoolean(true);
		this.response.appendInt(4);
		this.response.appendString("Help Desk");
		this.response.appendBoolean(true);
		this.response.appendInt(5);
		this.response.appendString("Trading");
		this.response.appendBoolean(true);
		this.response.appendInt(6);
		this.response.appendString("Games");
		this.response.appendBoolean(true);
		this.response.appendInt(7);
		this.response.appendString("Debates & Discussions");
		this.response.appendBoolean(true);
		this.response.appendInt(8);
		this.response.appendString("Grand Openings");
		this.response.appendBoolean(true);
		this.response.appendInt(9);
		this.response.appendString("Friending");
		this.response.appendBoolean(true);
		this.response.appendInt(10);
		this.response.appendString("Jobs");
		this.response.appendBoolean(true);
		this.response.appendInt(11);
		this.response.appendString("Group Events");
		this.response.appendBoolean(true);

		return this.response;
	}
}