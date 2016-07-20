import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';
import Emulator from '../../../Emulator';

export default class UserCreditsComposer extends MessageComposer {
	private habbo: Habbo;

	public constructor(habbo: Habbo){
		super();
		this.habbo = habbo;
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.UserCreditsComposer);
		this.response.appendString(this.habbo.getHabboInfo().getCredits() + ".0");

		return this.response;
	}
}