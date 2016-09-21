import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import Habbo from '../../../../HabboHotel/Users/Habbo';

export default class GenericAlertComposer extends MessageComposer {
	private message: string;

	public constructor(message: string, habbo?: Habbo){
		super();
		if(!habbo){
			this.message = message;
		}else{
			this.message = message.replace("%username%", habbo.getHabboInfo().getUsername());
		}
	}

	public compose(): ServerMessage {
		this.response.init(Outgoing.GenericAlertComposer);
		this.response.appendString(this.message);

		return this.response;
	}
}