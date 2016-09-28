import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import HotelViewDataComposer from '../../Outgoing/HotelView/HotelViewDataComposer';
import HallOfFameComposer from '../../Outgoing/HotelView/HallOfFameComposer';
import NewsListComposer from '../../Outgoing/HotelView/NewsListComposer';

export default class RequestNewsListEvent extends MessageHandler {
    public handle(): void {
        this.client.sendResponse(new HotelViewDataComposer("2013-05-08 13:0", "gamesmaker"));
        this.client.sendResponse(new HallOfFameComposer());
        this.client.sendResponse(new NewsListComposer());
    }
}
