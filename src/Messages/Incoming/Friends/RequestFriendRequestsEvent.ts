import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import LoadFriendRequestsComposer from '../../Outgoing/Friends/LoadFriendRequestsComposer';

export default class RequestFriendRequestsEvent extends MessageHandler {
	public handle(): void {
		this.client.sendResponse(new LoadFriendRequestsComposer(this.client.getHabbo()));
	}
}