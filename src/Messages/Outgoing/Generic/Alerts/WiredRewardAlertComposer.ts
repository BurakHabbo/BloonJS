import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import Habbo from '../../../../HabboHotel/Users/Habbo';

export default class WiredRewardAlertComposer extends MessageComposer {
	public static LIMITED_NO_MORE_AVAILABLE: number = 0;
	public static REWARD_ALREADY_RECEIVED: number = 1;
	public static REWARD_ALREADY_RECEIVED_THIS_TODAY: number = 2;
	public static REWARD_ALREADY_RECEIVED_THIS_HOUR: number = 3;
	public static REWARD_ALREADY_RECEIVED_THIS_MINUTE: number = 8;
	public static UNLUCKY_NO_REWARD: number = 4;
	public static REWARD_ALL_COLLECTED: number = 5;
	public static REWARD_RECEIVED_ITEM: number = 6;
	public static REWARD_RECEIVED_BADGE: number = 7;

	private code: number;

	public constructor(code: number){
		super();
		this.code = code;
	}

	public compose(): ServerMessage {
		this.response.init(Outgoing.WiredRewardAlertComposer);
		this.response.appendInt(this.code);

		return this.response;
	}
}