import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';
import MessengerBuddy from '../../../HabboHotel/Messenger/MessengerBuddy';

export default class FriendsComposer extends MessageComposer {
	private habbo: Habbo;

	public constructor(habbo: Habbo){
		super();
		this.habbo = habbo;
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.FriendsComposer);
		
		let friends: Array<MessengerBuddy> = this.habbo.getMessenger().getFriends();

		this.response.appendInt(300);
		this.response.appendInt(300);

		let keys = Object.keys(friends);
		this.response.appendInt(keys.length);

		for(let i = 0; i < keys.length; i++){
			let buddy: MessengerBuddy = friends[keys[i]];
			this.response.appendInt(buddy.getId());
			this.response.appendString(buddy.getUsername());
			this.response.appendInt(buddy.getGender() == "M" ? 0 : 1);
			this.response.appendBoolean(buddy.getOnline() == 1);
			this.response.appendBoolean(buddy.isInRoom());
			this.response.appendString(buddy.getLook());
			this.response.appendInt(0);
			this.response.appendString(buddy.getMotto());
			this.response.appendString("");
			this.response.appendString("");
			this.response.appendBoolean(false);
			this.response.appendBoolean(false);
			this.response.appendBoolean(false);
			this.response.appendShort(buddy.getRelation());
		}
		return this.response;
	}
}