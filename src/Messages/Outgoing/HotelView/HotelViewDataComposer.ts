import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';
import Emulator from '../../../Emulator';

export default class HotelViewDataComposer extends MessageComposer {
	private data: string;
	private key: string;

	public constructor(data: string, key: string) {
		super();
		this.data = data;
		this.key = key;
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.HotelViewDataComposer);
		this.response.appendString(this.data);
		this.response.appendString(this.key);

		return this.response;
	}
}