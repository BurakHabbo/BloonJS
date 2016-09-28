import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import UserCreditsComposer from '../../Outgoing/Users/UserCreditsComposer';

export default class RequestUserCreditsEvent extends MessageHandler {
    public handle(): void {
        this.client.sendResponse(new UserCreditsComposer(this.client.getHabbo()));
        //this.client.sendResponse(new UserCurrencyComposer(this.client.getHabbo()));
    }
}
