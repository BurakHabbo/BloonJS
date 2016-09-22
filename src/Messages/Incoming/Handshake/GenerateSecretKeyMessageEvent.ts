import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import SecretKeyMessageComposer from '../../Outgoing/Handshake/SecretKeyMessageComposer';

export default class GenerateSecretKeyMessageEvent extends MessageHandler {
	public handle(): void {
		if(this.client.getHabbo()){
			return this.client.permBan();
		}

		let clientPublicKeyCrypted: string = this.packet.readString();

		if(!clientPublicKeyCrypted){
			return this.client.permBan();
		}

		if(clientPublicKeyCrypted.length != 256){
			return this.client.permBan();
		}

		this.client.sendResponse(new SecretKeyMessageComposer(Emulator.getGameServer().getRsa().sign(this.client.getDiffieHellman().getPublicKey().toString())));
		this.client.getDiffieHellman().generateSharedKey(Emulator.getGameServer().getRsa().decrypt(clientPublicKeyCrypted));

		this.client.initRC4();
	}
}