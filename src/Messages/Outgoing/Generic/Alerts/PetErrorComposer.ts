import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import Habbo from '../../../../HabboHotel/Users/Habbo';

export default class PetErrorComposer extends MessageComposer {
    public static ROOM_ERROR_PETS_FORBIDDEN_IN_HOTEL: number = 0;
    public static ROOM_ERROR_PETS_FORBIDDEN_IN_FLAT: number = 1;
    public static ROOM_ERROR_MAX_PETS: number = 2;
    public static ROOM_ERROR_PETS_SELECTED_TILE_NOT_FREE: number = 3;
    public static ROOM_ERROR_PETS_NO_FREE_TILES: number = 4;
    public static ROOM_ERROR_MAX_OWN_PETS: number = 5;

    private errorCode: number;

    public constructor(errorCode: number) {
        super();
        this.errorCode = errorCode;
    }

    public compose(): ServerMessage {
        this.response.init(Outgoing.PetErrorComposer);
        this.response.appendInt(this.errorCode);

        return this.response;
    }
}
