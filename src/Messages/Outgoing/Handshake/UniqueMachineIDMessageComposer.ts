import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';

export default class UniqueMachineIDMessageComposer extends MessageComposer {
    private machineId: string;

    public constructor(machineId: string) {
        super();
        this.machineId = machineId;
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.UniqueMachineIDMessageComposer);
        this.response.appendString(this.machineId);
        return this.response;
    }
}
