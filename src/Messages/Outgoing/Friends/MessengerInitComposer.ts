import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';

export default class MessengerInitComposer extends MessageComposer {
    public constructor() {
        super();
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.MessengerInitComposer);
        this.response.appendInt(300);
        this.response.appendInt(1337);
        this.response.appendInt(500);
        this.response.appendInt(1000);
        this.response.appendInt(0);
        return this.response;
    }
}
