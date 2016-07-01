import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';

export default class InitCryptoMessageEvent extends MessageHandler {
	public handle(): void {
		this.client.initDH();

		/*Emulator.getGameServer().getRsa().sign("");*/
	}
}