import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import RoomUnit from '../../../../HabboHotel/Rooms/RoomUnit';

export default class RoomUnitIdleComposer extends MessageComposer {
    private roomUnit: RoomUnit;

    public constructor(roomUnit: RoomUnit) {
        super();
        this.roomUnit = roomUnit;
    }

    public compose(): ServerMessage {
        this.response.init(Outgoing.RoomUnitIdleComposer);
        this.response.appendInt(this.roomUnit.getId());
        this.response.appendBoolean(this.roomUnit.isIdle());

        return this.response;
    }
}
