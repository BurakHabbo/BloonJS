import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import NewNavigatorMetaDataComposer from '../../Outgoing/Navigator/NewNavigatorMetaDataComposer';
import NewNavigatorLiftedRoomsComposer from '../../Outgoing/Navigator/NewNavigatorLiftedRoomsComposer';
import NewNavigatorCollapsedCategoriesComposer from '../../Outgoing/Navigator/NewNavigatorCollapsedCategoriesComposer';
import NewNavigatorSavedSearchesComposer from '../../Outgoing/Navigator/NewNavigatorSavedSearchesComposer';
import NewNavigatorEventCategoriesComposer from '../../Outgoing/Navigator/NewNavigatorEventCategoriesComposer';

export default class RequestNewNavigatorDataEvent extends MessageHandler {
	public handle(): void {
		this.client.sendResponse(new NewNavigatorMetaDataComposer());
		this.client.sendResponse(new NewNavigatorLiftedRoomsComposer());
		this.client.sendResponse(new NewNavigatorCollapsedCategoriesComposer());
		this.client.sendResponse(new NewNavigatorSavedSearchesComposer());
		this.client.sendResponse(new NewNavigatorEventCategoriesComposer());
	}
}