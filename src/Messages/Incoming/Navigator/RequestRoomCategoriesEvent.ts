import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import RoomCategoriesComposer from '../../Outgoing/Navigator/RoomCategoriesComposer';
import NewNavigatorEventCategoriesComposer from '../../Outgoing/Navigator/NewNavigatorEventCategoriesComposer';

export default class RequestRoomCategoriesEvent extends MessageHandler {
    public handle(): void {
        this.client.sendResponse(new RoomCategoriesComposer(Emulator.getGameEnvironment().getRoomManager().roomCategoriesForHabbo(this.client.getHabbo())));
        this.client.sendResponse(new NewNavigatorEventCategoriesComposer());
    }
}
