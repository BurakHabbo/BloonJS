import MessageHandler from '../../MessageHandler';
import Emulator from '../../../../Emulator';
import Room from '../../../../HabboHotel/Rooms/Room';
import GameClient from '../../../../HabboHotel/GameClients/GameClient';

export default class RoomUserSignEvent extends MessageHandler {
    public handle(): void {
        let signId: number = this.packet.readInt();

        if (this.client.getHabbo().getHabboInfo().getCurrentRoom() != null) {
            this.client.getHabbo().getRoomUnit().addStatus("sign", signId.toString());
            this.client.getHabbo().getHabboInfo().getCurrentRoom().unIdle(this.client.getHabbo());
        }
    }
}
