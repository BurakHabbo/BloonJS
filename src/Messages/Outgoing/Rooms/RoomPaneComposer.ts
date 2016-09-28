import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Room from '../../../HabboHotel/Rooms/Room';

export default class RoomPaneComposer extends MessageComposer {
    private room: Room;
    private roomOwner: boolean;

    public constructor(room: Room, roomOwner: boolean) {
        super();
        this.room = room;
        this.roomOwner = roomOwner;
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.RoomPaneComposer);
        this.response.appendInt(this.room.getId());
        this.response.appendBoolean(this.roomOwner);

        return this.response;
    }
}
