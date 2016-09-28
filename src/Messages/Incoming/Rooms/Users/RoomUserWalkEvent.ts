import MessageHandler from '../../MessageHandler';
import Emulator from '../../../../Emulator';
import Room from '../../../../HabboHotel/Rooms/Room';
import RoomUnit from '../../../../HabboHotel/Rooms/RoomUnit';
import GameClient from '../../../../HabboHotel/GameClients/GameClient';
import Habbo from '../../../../HabboHotel/Users/Habbo';

export default class RoomUserWalkEvent extends MessageHandler {
    public handle(): void {
        let x: number = this.packet.readInt();
        let y: number = this.packet.readInt();

        let habbo: Habbo = this.client.getHabbo();
        let roomUnit: RoomUnit = this.client.getHabbo().getRoomUnit();

        if (roomUnit.isTeleporting())
            return;

        if (roomUnit.getCacheable("control") != null) {
            habbo = <Habbo>roomUnit.getCacheable("control");

            if (habbo.getHabboInfo().getCurrentRoom() != this.client.getHabbo().getHabboInfo().getCurrentRoom()) {
                habbo.getRoomUnit().removeCacheable("controller");
                this.client.getHabbo().getRoomUnit().removeCacheable("control");
                habbo = this.client.getHabbo();
            }
        }

        roomUnit = habbo.getRoomUnit();

        if (roomUnit != null && roomUnit.isInRoom() && roomUnit.canWalk()) {
            if (!roomUnit.isCmdTeleport()) {
                //if(habbo.getHabboInfo().getRiding() != null && habbo.getHabboInfo().getRiding().getTask().equals(PetTask.JUMP))
                //return;

                if (x == roomUnit.getX() && y == roomUnit.getY())
                    return;

                roomUnit.setGoalLocation(x, y);
            } else {
                roomUnit.stopWalking();
            }
        }
    }
}
