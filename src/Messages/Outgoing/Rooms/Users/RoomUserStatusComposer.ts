import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import Habbo from '../../../../HabboHotel/Users/Habbo';
import HabboGender from '../../../../HabboHotel/Users/HabboGender';
import RoomUnit from '../../../../HabboHotel/Rooms/RoomUnit';

export default class RoomUserStatusComposer extends MessageComposer {
    private habbos: Array<Habbo>;
    private roomUnits: Array<RoomUnit>;

    public constructor(value: Habbo | RoomUnit | Array<any>) {
        super();
        if (value instanceof Habbo) {
            this.habbos = new Array<Habbo>(value);
        } else if (value instanceof RoomUnit) {
            this.roomUnits = new Array<RoomUnit>(value);
        } else if (value[0] instanceof Habbo) {
            this.habbos = value;
        } else if (value[0] instanceof RoomUnit) {
            this.roomUnits = value;
        }
    }

    public compose(): ServerMessage {
        this.response.init(Outgoing.RoomUserStatusComposer);

        if (this.roomUnits != null) {
            this.response.appendInt(this.roomUnits.length);
            for (let i = 0; i < this.roomUnits.length; i++) {
                let roomUnit: RoomUnit = this.roomUnits[i];
                this.response.appendInt(roomUnit.getId());
                this.response.appendInt(roomUnit.getX());
                this.response.appendInt(roomUnit.getY());
                this.response.appendString(roomUnit.getZ().toFixed(1));
                this.response.appendInt(roomUnit.getHeadRotation());
                this.response.appendInt(roomUnit.getBodyRotation());

                let status: string = "/";
                let unitStatus: Array<string> = roomUnit.getStatus();
                let keysStatus = Object.keys(unitStatus);

                for (let j = 0; j < keysStatus.length; j++) {
                    let key = keysStatus[j];
                    let value = unitStatus[key];
                    status = status + key + " " + value + "/";
                }

                this.response.appendString(status);
            }
        } else if (this.habbos != null) {
            let keys = Object.keys(this.habbos);
            this.response.appendInt(keys.length);

            for (let i = 0; i < keys.length; i++) {
                let habbo: Habbo = this.habbos[keys[i]];
                this.response.appendInt(habbo.getRoomUnit().getId());
                this.response.appendInt(habbo.getRoomUnit().getX());
                this.response.appendInt(habbo.getRoomUnit().getY());
                this.response.appendString(habbo.getRoomUnit().getZ().toFixed(1));
                this.response.appendInt(habbo.getRoomUnit().getHeadRotation());
                this.response.appendInt(habbo.getRoomUnit().getBodyRotation());

                let status: string = "/";
                let unitStatus: Array<string> = habbo.getRoomUnit().getStatus();
                let keysStatus = Object.keys(unitStatus);

                for (let j = 0; j < keysStatus.length; j++) {
                    let key = keysStatus[j];
                    let value = unitStatus[key];
                    status = status + key + " " + value + "/";
                }

                this.response.appendString(status);
            }
        } else {
            this.response.appendInt(0);
        }

        return this.response;
    }
}
