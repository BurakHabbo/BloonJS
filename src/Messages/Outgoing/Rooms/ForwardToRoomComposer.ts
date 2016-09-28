import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';

export default class ForwardToRoomComposer extends MessageComposer {
    private roomId: number;

    public constructor(roomId: number) {
        super();
        this.roomId = roomId;
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.ForwardToRoomComposer);
        this.response.appendInt(this.roomId);

        return this.response;
    }
}
