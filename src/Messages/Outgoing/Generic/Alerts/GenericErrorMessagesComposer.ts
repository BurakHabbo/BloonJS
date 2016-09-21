import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import Habbo from '../../../../HabboHotel/Users/Habbo';

export default class GenericErrorMessagesComposer extends MessageComposer {
	public static AUTHENTICATION_FAILED: number = -3;
	public static CONNECTING_TO_THE_SERVER_FAILED: number = -400;
	public static KICKED_OUT_OF_THE_ROOM: number = 4008;
	public static NEED_TO_BE_VIP: number = 4009;
	public static ROOM_NAME_UNACCEPTABLE: number = 4010;
	public static CANNOT_BAN_GROUP_MEMBER: number = 4011;

	private errorCode: number;

	public constructor(errorCode: number){
		super();
		this.errorCode = errorCode;
	}

	public compose(): ServerMessage {
		this.response.init(Outgoing.GenericErrorMessagesComposer);
		this.response.appendInt(this.errorCode);

		return this.response;
	}
}