import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';

export default class UserPermissionsComposer extends MessageComposer {
	private clubLevel: number;
	private habbo: Habbo;

	public constructor(habbo: Habbo){
		super();
		this.clubLevel = 2;//habbo.getHabboStats().hasActiveClub() ? 2 : 0;
		this.habbo = habbo;
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.UserPermissionsComposer);
		this.response.appendInt(this.clubLevel);
		this.response.appendInt(this.habbo.getHabboInfo().getRank());
		this.response.appendBoolean(true);//this.habbo.hasPermission("acc_ambassador")
		return this.response;
	}
}