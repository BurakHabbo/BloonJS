import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import Habbo from '../../../../HabboHotel/Users/Habbo';

export default class CustomNotificationComposer extends MessageComposer {
	public static HOPPER_NO_COSTUME: number = 1;
	public static HOPPER_NO_HC: number = 2;
	public static GATE_NO_HC: number = 3;
	public static STARS_NOT_CANDIDATE: number = 4;
	public static STARS_NOT_ENOUGH_USERS: number = 5;

	private type: number;

	public constructor(type: number){
		super();
		this.type = type;
	}

	public compose(): ServerMessage {
		this.response.init(Outgoing.CustomNotificationComposer);
		this.response.appendInt(this.type);

		return this.response;
	}
}