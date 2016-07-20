import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';
import Emulator from '../../../Emulator';

export default class NewNavigatorMetaDataComposer extends MessageComposer {
	public constructor(){
		super();
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.NewNavigatorMetaDataComposer);
		this.response.appendInt(4);

		this.response.appendString("official_view");
		this.response.appendInt(0);
		this.response.appendString("hotel_view");
		this.response.appendInt(0);
		this.response.appendString("roomads_view");
		this.response.appendInt(0);
		this.response.appendString("myworld_view");
		this.response.appendInt(0);

		return this.response;
	}
}