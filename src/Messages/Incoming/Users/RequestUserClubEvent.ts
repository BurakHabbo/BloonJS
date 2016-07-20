import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import UserClubComposer from '../../Outgoing/Users/UserClubComposer';
import UserPermissionsComposer from '../../Outgoing/Users/UserPermissionsComposer';

export default class RequestUserClubEvent extends MessageHandler {
	public handle(): void {
		this.client.sendResponse(new UserClubComposer(this.client.getHabbo()));
		this.client.sendResponse(new UserPermissionsComposer(this.client.getHabbo()));
	}
}