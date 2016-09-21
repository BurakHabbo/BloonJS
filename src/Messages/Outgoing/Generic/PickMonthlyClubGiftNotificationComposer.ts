import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';

export default class PickMonthlyClubGiftNotificationComposer extends MessageComposer {
	private count: number;

	public constructor(count: number){
		super();
		this.count = count;
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.PickMonthlyClubGiftNotificationComposer);
		this.response.appendInt(this.count);

		return this.response;
	}
}