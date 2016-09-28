import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';

export default class SessionRightsComposer extends MessageComposer {
    public constructor() {
        super();
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.SessionRightsComposer);
        this.response.appendBoolean(true);
        this.response.appendBoolean(false);

        return this.response;
    }
}
