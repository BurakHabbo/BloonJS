import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';
import HabboGender from '../../../HabboHotel/Users/HabboGender';

export default class UserDataComposer extends MessageComposer {
	private habbo: Habbo;

	public constructor(habbo: Habbo){
		super();
		this.habbo = habbo;
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.UserDataComposer);
		this.response.appendInt(this.habbo.getHabboInfo().getId());
		this.response.appendString(this.habbo.getHabboInfo().getUsername());
		this.response.appendString(this.habbo.getHabboInfo().getLook());
		this.response.appendString(this.habbo.getHabboInfo().getGender() == HabboGender.M ? "M": "F");
		this.response.appendString(this.habbo.getHabboInfo().getMotto());
		this.response.appendString(this.habbo.getHabboInfo().getRealName());
		this.response.appendBoolean(false);
		this.response.appendInt(0);//this.habbo.getHabboStats().respectPointsReceived
		this.response.appendInt(3);//this.habbo.getHabboStats().respectPointsToGive
		this.response.appendInt(3);//this.habbo.getHabboStats().petRespectPointsToGive
		this.response.appendBoolean(false);
		this.response.appendString("01-01-1970 00:00:00");
		this.response.appendBoolean(false); //can change name.
		this.response.appendBoolean(false); //safatey locked

		return this.response;
	}
}