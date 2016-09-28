import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import Habbo from '../../../../HabboHotel/Users/Habbo';

export default class HotelWillCloseInMinutesAndBackInComposer extends MessageComposer {
    private closeInMinutes: number;
    private reopenInMinutes: number;

    public constructor(closeInMinutes: number, reopenInMinutes: number) {
        super();
        this.closeInMinutes = closeInMinutes;
        this.reopenInMinutes = reopenInMinutes;
    }

    public compose(): ServerMessage {
        this.response.init(Outgoing.HotelWillCloseInMinutesAndBackInComposer);
        this.response.appendBoolean(true);
        this.response.appendInt(this.closeInMinutes);
        this.response.appendInt(this.reopenInMinutes);

        return this.response;
    }
}
