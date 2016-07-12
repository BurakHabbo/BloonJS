import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import UserDataComposer from '../../Outgoing/Users/UserDataComposer';
import ForwardToRoomComposer from '../../Outgoing/Rooms/ForwardToRoomComposer';

export default class RequestUserDataEvent extends MessageHandler {
	public handle(): void {
		this.client.sendResponse(new UserDataComposer(this.client.getHabbo()));

		if(this.client.getHabbo().getHabboInfo().getHomeRoom() != 0){
			this.client.sendResponse(new ForwardToRoomComposer(this.client.getHabbo().getHabboInfo().getHomeRoom()));
		}
	}
}