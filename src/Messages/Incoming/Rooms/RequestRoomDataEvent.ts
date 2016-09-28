import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import Room from '../../../HabboHotel/Rooms/Room';
import GameClient from '../../../HabboHotel/GameClients/GameClient';
import RoomDataComposer from '../../Outgoing/Rooms/RoomDataComposer';

export default class RequestRoomDataEvent extends MessageHandler {
    public handle(): void {
        let roomId: number = this.packet.readInt();
        let something: number = this.packet.readInt();
        let something2: number = this.packet.readInt();

        Emulator.getGameEnvironment().getRoomManager().loadRoom(roomId, this.client, function(room: Room, client: GameClient) {
            if (room != null) {
                let unknown: boolean = true;

                if (something == 0 && something2 == 1) {
                    unknown = false;
                }

                client.sendResponse(new RoomDataComposer(room, client.getHabbo(), client.getHabbo().getHabboInfo().getCurrentRoom() != room, unknown));
            }
        });
    }
}
