import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';

export default class PongComposer extends MessageComposer {
    private id: number;

    public constructor(id: number) {
        super();
        this.id = id;
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.PongComposer);
        this.response.appendInt(this.id);
        return this.response;
    }
}
