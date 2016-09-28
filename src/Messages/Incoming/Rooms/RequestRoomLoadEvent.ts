import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import Room from '../../../HabboHotel/Rooms/Room';
import GameClient from '../../../HabboHotel/GameClients/GameClient';
import RoomDataComposer from '../../Outgoing/Rooms/RoomDataComposer';

export default class RequestRoomLoadEvent extends MessageHandler {
    public handle(): void {
        let roomId: number = this.packet.readInt();
        let password: string = this.packet.readString();

        if (this.client.getHabbo().getHabboInfo().getCurrentRoom() != null) {
            //leave room
            this.client.getHabbo().getHabboInfo().setCurrentRoom(null);
        }

        Emulator.getGameEnvironment().getRoomManager().prepareRoom(this.client.getHabbo(), roomId, password);
    }
}
