import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import Habbo from '../../../../HabboHotel/Users/Habbo';

export default class StaffAlertWIthLinkAndOpenHabboWayComposer extends MessageComposer {
    private message: string;
    private link: string;

    public constructor(message: string, link: string) {
        super();
        this.message = message;
        this.link = link;
    }

    public compose(): ServerMessage {
        this.response.init(Outgoing.StaffAlertWIthLinkAndOpenHabboWayComposer);
        this.response.appendString(this.message);
        this.response.appendString(this.link);

        return this.response;
    }
}
