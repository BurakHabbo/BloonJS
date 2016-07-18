import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import Room from '../../../HabboHotel/Rooms/Room';
import GameClient from '../../../HabboHotel/GameClients/GameClient';
import RoomRelativeMapComposer from '../../Outgoing/Rooms/RoomRelativeMapComposer';
import RoomHeightMapComposer from '../../Outgoing/Rooms/RoomHeightMapComposer';

export default class RequestRoomHeightmapEvent extends MessageHandler {
	public handle(): void {
		if(this.client.getHabbo().getHabboInfo().getLoadingRoom() > 0){
			Emulator.getGameEnvironment().getRoomManager().loadRoom(this.client.getHabbo().getHabboInfo().getLoadingRoom(), this.client, function(room: Room, client: GameClient){
				if(room != null){
					client.sendResponse(new RoomRelativeMapComposer(room));
					client.sendResponse(new RoomHeightMapComposer(room));
				}
			});
		}
	}
}