import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';

export default class RequestNewNavigatorRoomsEvent extends MessageHandler {
    public handle(): void {
        let view: string = this.packet.readString();
        let query: string = this.packet.readString();

        //let filter: NavigatorFilter = Emulator.getGameEnvironment().getNavigatorManager().filters.get(view);
    }
}
