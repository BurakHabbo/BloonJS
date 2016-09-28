import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import InitCryptoMessageComposer from '../../Outgoing/Handshake/InitCryptoMessageComposer';

export default class InitCryptoMessageEvent extends MessageHandler {
    public handle(): void {
        if (this.client.getHabbo()) {
            return this.client.permBan();
        }

        this.client.initDH();

        this.client.sendResponse(new InitCryptoMessageComposer(Emulator.getGameServer().getRsa().sign(this.client.getDiffieHellman().getPrime().toString()), Emulator.getGameServer().getRsa().sign(this.client.getDiffieHellman().getGenerator().toString())));
    }
}
