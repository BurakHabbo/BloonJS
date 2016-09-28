import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';
import Emulator from '../../../Emulator';
import RoomCategory from '../../../HabboHotel/Rooms/RoomCategory';

export default class RoomCategoriesComposer extends MessageComposer {
    private categories: Array<RoomCategory>;

    public constructor(categories: Array<RoomCategory>) {
        super();
        this.categories = categories;
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.RoomCategoriesComposer);
        this.response.appendInt(this.categories.length);

        for (let i = 0; i < this.categories.length; i++) {
            let category: RoomCategory = this.categories[i];
            this.response.appendInt(category.getId());
            this.response.appendString(category.getCaption());
            this.response.appendBoolean(true);
            this.response.appendBoolean(false);
            this.response.appendString(category.getCaption());

            if (category.getCaption().lastIndexOf("${", 0) === 0) {
                this.response.appendString("");
            } else {
                this.response.appendString(category.getCaption());
            }

            this.response.appendBoolean(false);
        }
        return this.response;
    }
}
