import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Room from '../../../HabboHotel/Rooms/Room';
import RoomTileState from '../../../HabboHotel/Rooms/RoomTileState';

export default class RoomRelativeMapComposer extends MessageComposer {
    private room: Room;

    public constructor(room: Room) {
        super();
        this.room = room;
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.RoomRelativeMapComposer);
        this.response.appendInt(this.room.getLayout().getMapSize() / this.room.getLayout().getMapSizeY());
        this.response.appendInt(this.room.getLayout().getMapSize());

        for (let y: number = 0; y < this.room.getLayout().getMapSizeY(); y++) {
            for (let x: number = 0; x < this.room.getLayout().getMapSizeX(); x++) {
                this.response.appendShort(this.room.getLayout().getSquareStates()[x][y] == RoomTileState.BLOCKED ? 65535 : this.room.getLayout().getSquareHeights()[x][y]);
            }
        }
        return this.response;
    }
}
