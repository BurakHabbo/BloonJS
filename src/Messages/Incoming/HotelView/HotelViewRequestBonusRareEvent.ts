import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import BonusRareComposer from '../../Outgoing/HotelView/BonusRareComposer';

export default class HotelViewRequestBonusRareEvent extends MessageHandler {
    public handle(): void {
        this.client.sendResponse(new BonusRareComposer(this.client.getHabbo()));
    }
}
