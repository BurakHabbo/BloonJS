import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import Habbo from '../../../../HabboHotel/Users/Habbo';

export default class StaffAlertAndOpenHabboWayComposer extends MessageComposer {
    private message: string;

    public constructor(message: string) {
        super();
        this.message = message;
    }

    public compose(): ServerMessage {
        this.response.init(Outgoing.StaffAlertAndOpenHabboWayComposer);
        this.response.appendString(this.message);

        return this.response;
    }
}
