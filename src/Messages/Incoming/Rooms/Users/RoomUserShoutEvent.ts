import MessageHandler from '../../MessageHandler';
import Emulator from '../../../../Emulator';
import Room from '../../../../HabboHotel/Rooms/Room';
import GameClient from '../../../../HabboHotel/GameClients/GameClient';
import RoomChatMessage from '../../../../HabboHotel/Rooms/RoomChatMessage';
import RoomChatType from '../../../../HabboHotel/Rooms/RoomChatType';

export default class RoomUserShoutEvent extends MessageHandler {
    public handle(): void {
        if (this.client.getHabbo().getHabboInfo().getCurrentRoom() == null)
            return;

        //if (!this.client.getHabbo().getRoomUnit().canTalk())
        //    return;

        let message: RoomChatMessage = new RoomChatMessage(this);
        this.client.getHabbo().getHabboInfo().getCurrentRoom().talk(this.client.getHabbo(), message, RoomChatType.SHOUT);
    }
}
