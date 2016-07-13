import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import Room from '../../../HabboHotel/Rooms/Room';
import GameClient from '../../../HabboHotel/GameClients/GameClient';

export default class RequestRoomDataEvent extends MessageHandler {
	public handle(): void {
		//let room: Room = Emulator.getGameEnvironment().getRoomManager().loadRoom(this.packet.readInt());
		let roomId: number = this.packet.readInt();
		let something: number = this.packet.readInt();
		let something2: number = this.packet.readInt();

		Emulator.getGameEnvironment().getRoomManager().loadRoom(roomId, this.client, function(room: Room, client: GameClient){
			if(room != null){
				console.log(room);
				
				let unknown: boolean = true;

				if(something == 0 && something2 == 1){
					unknown = false;
				}

				client.sendResponse(null);
			}
		});
	}
}