import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import SecretKeyMessageComposer from '../../Outgoing/Handshake/SecretKeyMessageComposer';

export default class GenerateSecretKeyMessageEvent extends MessageHandler {
	public handle(): void {
		this.client.sendResponse(new SecretKeyMessageComposer(Emulator.getGameServer().getRsa().sign(this.client.getDiffieHellman().getPublicKey().toString())));
		this.client.getDiffieHellman().generateSharedKey(Emulator.getGameServer().getRsa().decrypt(this.packet.readString()));

		this.client.initRC4();
	}
}