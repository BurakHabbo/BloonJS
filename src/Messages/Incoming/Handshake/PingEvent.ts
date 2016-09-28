import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import PongComposer from '../../Outgoing/Handshake/PongComposer';

export default class PingEvent extends MessageHandler {
    public handle(): void {
        this.client.sendResponse(new PongComposer(this.packet.readInt()));
    }
}
