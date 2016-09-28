import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Room from '../../../HabboHotel/Rooms/Room';

export default class RoomModelComposer extends MessageComposer {
    private room: Room;

    public constructor(room: Room) {
        super();
        this.room = room;
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.RoomModelComposer);
        this.response.appendString(this.room.getLayout().getName());
        this.response.appendInt(this.room.getId());
        return this.response;
    }
}
