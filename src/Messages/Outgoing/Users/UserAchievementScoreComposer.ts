import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';

export default class UserAchievementScoreComposer extends MessageComposer {
	private habbo: Habbo;

	public constructor(habbo: Habbo){
		super();
		this.habbo = habbo;
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.UserAchievementScoreComposer);
		this.response.appendInt(666);//habbo.getHabboStats().getAchievementScore()
		return this.response;
	}
}