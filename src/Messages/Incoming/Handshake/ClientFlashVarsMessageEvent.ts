import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';

export default class ClientFlashVarsMessageEvent extends MessageHandler {
    public handle(): void {
        if (this.client.getHabbo() || !this.client.isRC4initialized()) {
            return this.client.permBan();
        }

        if (this.packet.readInt() == -1) {
            return this.client.permBan();
        }

        let flashBase = this.packet.readString();
        let externalVars = this.packet.readString();

        if (flashBase != Emulator.flashBase || externalVars != Emulator.externalVars) {
            return this.client.permBan();
        }
    }
}
