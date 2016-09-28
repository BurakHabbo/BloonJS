import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import RoomRightLevels from '../../../HabboHotel/Rooms/RoomRightLevels';

export default class RoomRightsComposer extends MessageComposer {
    private type: RoomRightLevels;

    public constructor(type: RoomRightLevels) {
        super();
        this.type = type;
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.ForwardToRoomComposer);
        this.response.appendInt(this.type);

        return this.response;
    }
}
