import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';

export default class InitCryptoMessageComposer extends MessageComposer {
    private signedPrime: string;
    private signedGenerator: string;

    public constructor(signedPrime: string, signedGenerator: string) {
        super();
        this.signedPrime = signedPrime;
        this.signedGenerator = signedGenerator;
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.InitCryptoMessageComposer);
        this.response.appendString(this.signedPrime);
        this.response.appendString(this.signedGenerator);
        return this.response;
    }
}
