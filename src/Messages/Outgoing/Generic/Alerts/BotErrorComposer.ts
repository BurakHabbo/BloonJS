import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import Habbo from '../../../../HabboHotel/Users/Habbo';

export default class BotErrorComposer extends MessageComposer {
    public static ROOM_ERROR_BOTS_FORBIDDEN_IN_HOTEL: number = 0;
    public static ROOM_ERROR_BOTS_FORBIDDEN_IN_FLAT: number = 1;
    public static ROOM_ERROR_MAX_BOTS: number = 2;
    public static ROOM_ERROR_BOTS_SELECTED_TILE_NOT_FREE: number = 3;
    public static ROOM_ERROR_BOTS_NAME_NOT_ACCEPT: number = 4;

    private errorCode: number;

    public constructor(errorCode: number) {
        super();
        this.errorCode = errorCode;
    }

    public compose(): ServerMessage {
        this.response.init(Outgoing.BotErrorComposer);
        this.response.appendInt(this.errorCode);

        return this.response;
    }
}
