import MessageHandler from '../MessageHandler';

export default class ReleaseVersionMessageEvent extends MessageHandler {
	public handle(): void {
		this.packet.readString();
	}
}