import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import RoomChatMessage from '../../../../HabboHotel/Rooms/RoomChatMessage';

export default class RoomUserShoutComposer extends MessageComposer {
    private roomChatMessage: RoomChatMessage;

    public constructor(roomChatMessage: RoomChatMessage) {
        super();
        this.roomChatMessage = roomChatMessage;
    }

    public compose(): ServerMessage {
        this.response.init(Outgoing.RoomUserShoutComposer);
        this.roomChatMessage.serialize(this.response);
        return this.response;
    }
}
