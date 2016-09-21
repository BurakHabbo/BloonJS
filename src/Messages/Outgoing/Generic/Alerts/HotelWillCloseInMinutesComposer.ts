import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import Habbo from '../../../../HabboHotel/Users/Habbo';

export default class HotelWillCloseInMinutesComposer extends MessageComposer {
	private minutes: number;

	public constructor(minutes: number){
		super();
		this.minutes = minutes;
	}

	public compose(): ServerMessage {
		this.response.init(Outgoing.HotelWillCloseInMinutesComposer);
		this.response.appendInt(this.minutes);

		return this.response;
	}
}