import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';
import Emulator from '../../../Emulator';

export default class UserClubComposer extends MessageComposer {
    private habbo: Habbo;

    public constructor(habbo: Habbo) {
        super();
        this.habbo = habbo;
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.UserClubComposer);
        this.response.appendString("club_habbo");

        let endTimestamp: number = 1502547871;//this.habbo.getHabboStats().getClubExpireTimestamp();
        let now = Emulator.getIntUnixTimestamp();

        if (endTimestamp >= now) {
            let days: number = Math.floor((endTimestamp - now) / 86400);
            let years: number = Math.floor(days / 365);

            let months: number = 0;

            if (days > 31) {
                let months: number = Math.floor(days / 31);
                days = days - (months * 31);
            }

            this.response.appendInt(days);
            this.response.appendInt(1);
            this.response.appendInt(months);
            this.response.appendInt(years);
        } else {
            this.response.appendInt(0);
            this.response.appendInt(0);
            this.response.appendInt(0);
            this.response.appendInt(0);
        }

        this.response.appendBoolean(true);
        this.response.appendBoolean(true);
        this.response.appendInt(0);
        this.response.appendInt(77);
        this.response.appendInt(endTimestamp - now);

        return this.response;
    }
}
