import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';
import Emulator from '../../../Emulator';

export default class NewNavigatorLiftedRoomsComposer extends MessageComposer {
    public constructor() {
        super();
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.NewNavigatorLiftedRoomsComposer);
        this.response.appendInt(0);

        return this.response;
    }
}
