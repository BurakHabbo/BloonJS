import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';
import Emulator from '../../../Emulator';

export default class BonusRareComposer extends MessageComposer {
    private habbo: Habbo;

    public constructor(habbo: Habbo) {
        super();
        this.habbo = habbo;
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.BonusRareComposer);

        this.response.appendString(Emulator.getConfig().getValue("hotelview.promotional.reward.name", "prizetrophy_breed_gold"));
        this.response.appendInt(Emulator.getConfig().getInt("hotelview.promotional.reward.id", 0));
        this.response.appendInt(Emulator.getConfig().getInt("hotelview.promotional.points", 120));
        let points = Emulator.getConfig().getInt("hotelview.promotional.points", 120) - 50; //this.habbo.getHabboInfo().getBonusRarePoints();
        this.response.appendInt(points < 0 ? 0 : points);

        return this.response;
    }
}
