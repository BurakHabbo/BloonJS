import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';

export default class SecretKeyMessageComposer extends MessageComposer {
	private signedPublicKey: string;

	public constructor(signedPublicKey: string){
		super();
		this.signedPublicKey = signedPublicKey;
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.SecretKeyMessageComposer);
		this.response.appendString(this.signedPublicKey);
		this.response.appendBoolean(true);
		return this.response;
	}
}