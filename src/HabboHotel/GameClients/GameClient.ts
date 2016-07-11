import net = require('net');
import Emulator from '../../Emulator';
import Logging from '../../Core/Logging';
import Habbo from '../Users/Habbo';
import DiffieHellman from '../../Crypto/DiffieHellman';
import MessageComposer from '../../Messages/Outgoing/MessageComposer';
import ServerMessage from '../../Messages/ServerMessage';
import RC4 from '../../Crypto/RC4';

export default class GameClient extends net.Socket {
	private habbo: Habbo;
	private diffieHellman: DiffieHellman;
	private rc4initialized: boolean = false;
	private rc4server: RC4;
	private rc4client: RC4;

	public constructor() {
		super();
	}

	public sendResponse(response: MessageComposer | ServerMessage) {
		if(response instanceof MessageComposer){
			let packet: ServerMessage = response.compose();
			//if(Emulator.getConfig().getBoolean('debug.show.packets'))
				Emulator.getLogging().logPacketLine("[" + Logging.ANSI_PURPLE + "SERVER" + Logging.ANSI_RESET + "][" + packet.getHeader() +"] => " + packet.getMessageBody());
			this.write(this.isRC4initialized() ? this.getRC4server().parse(packet.get()) : packet.get());
		}else if(response instanceof ServerMessage){
			this.write(this.isRC4initialized() ? this.getRC4server().parse(response.get()) : response.get());
		}
	}

	public initDH(): void {
		this.diffieHellman = new DiffieHellman();
		this.diffieHellman.generateDH();
	}

	public initRC4(): void {
		this.rc4initialized = true;
		this.rc4client = new RC4(this.getDiffieHellman().getSharedKey().toByteArray(true));
		this.rc4server = new RC4(this.getDiffieHellman().getSharedKey().toByteArray(true));
	}

	public getDiffieHellman(): DiffieHellman {
		return this.diffieHellman;
	}

	public getRC4client(): RC4 {
		return this.rc4client;
	}

	public getRC4server(): RC4 {
		return this.rc4server;
	}

	public isRC4initialized(): boolean {
		return this.rc4initialized;
	}
}