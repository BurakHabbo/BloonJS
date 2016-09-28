import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';

export default class ReleaseVersionMessageEvent extends MessageHandler {
    public handle(): void {
        if (this.client.getHabbo()) {
            return this.client.permBan();
        }

        let swfBuild: string = this.packet.readString();

        if (swfBuild != Emulator.swfBuild) {
            return this.client.permBan();
        }

        if (this.packet.readString() != "FLASH") {
            return this.client.permBan();
        }

        if (this.packet.readInt() == -1) {
            return this.client.permBan();
        }

        if (this.packet.readInt() == -1) {
            return this.client.permBan();
        }
    }
}
