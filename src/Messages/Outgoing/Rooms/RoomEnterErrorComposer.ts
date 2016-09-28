import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';

export default class RoomEnterErrorComposer extends MessageComposer {
    public static ROOM_ERROR_GUESTROOM_FULL: number = 1;
    public static ROOM_ERROR_CANT_ENTER: number = 2;
    public static ROOM_ERROR_QUE: number = 3;
    public static ROOM_ERROR_BANNED: number = 4;

    public static ROOM_NEEDS_VIP: string = "c";
    public static EVENT_USERS_ONLY: string = "e1";
    public static ROOM_LOCKED: string = "na";
    public static TO_MANY_SPECTATORS: string = "spectator_mode_full";

    private errorCode: number;
    private queError: string;

    public constructor(errorCode: number, queError?: string) {
        super();
        this.errorCode = errorCode;

        if (!queError) {
            this.queError = "";
        } else {
            this.queError = queError;
        }
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.RoomEnterErrorComposer);
        this.response.appendInt(this.errorCode);
        this.response.appendString(this.queError);

        return this.response;
    }
}
