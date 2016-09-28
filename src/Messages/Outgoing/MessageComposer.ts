import ServerMessage from '../ServerMessage';

abstract class MessageComposer {
    protected response: ServerMessage;

    public constructor() {
        this.response = new ServerMessage();
    }

    public abstract compose(): ServerMessage;
}

export default MessageComposer;
