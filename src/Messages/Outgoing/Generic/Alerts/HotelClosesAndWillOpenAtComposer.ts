import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import Habbo from '../../../../HabboHotel/Users/Habbo';

export default class HotelClosesAndWillOpenAtComposer extends MessageComposer {
    private hour: number;
    private minute: number;
    private disconnected: boolean;

    public constructor(hour: number, minute: number, disconnected: boolean) {
        super();
        this.hour = hour;
        this.minute = minute;
        this.disconnected = disconnected;
    }

    public compose(): ServerMessage {
        this.response.init(Outgoing.HotelClosesAndWillOpenAtComposer);
        this.response.appendInt(this.hour);
        this.response.appendInt(this.minute);
        this.response.appendBoolean(this.disconnected);

        return this.response;
    }
}
