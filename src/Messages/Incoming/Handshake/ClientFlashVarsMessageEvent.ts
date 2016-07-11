import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';

export default class ClientFlashVarsMessageEvent extends MessageHandler {
	public handle(): void {
		this.packet.readInt();
		let flashBase = this.packet.readString();
		let externalVars = this.packet.readString();
	}
}