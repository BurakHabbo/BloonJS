import MessageHandler from './Incoming/MessageHandler';
import Incoming from './Incoming/Incoming';
import ReleaseVersionMessageEvent from './Incoming/Handshake/ReleaseVersionMessageEvent';
import InitCryptoMessageEvent from './Incoming/Handshake/InitCryptoMessageEvent';
import GenerateSecretKeyMessageEvent from './Incoming/Handshake/GenerateSecretKeyMessageEvent';
import GameClient from '../HabboHotel/GameClients/GameClient';
import ClientMessage from './ClientMessage';
import Emulator from '../Emulator';
import Logging from '../Core/Logging';

export default class PacketManager {
	private incoming: Array<any>;

	public constructor() {
		this.incoming = [];
		this.registerHandshake();
	}

	public handlePacket(client: GameClient, packet: ClientMessage): void {
		if(client == null)
			return;

		try{
			if(this.isRegistered(packet.getHeader())){
				//if(Emulator.getConfig().getBoolean('debug.show.packets'))
					Emulator.getLogging().logPacketLine("[" + Logging.ANSI_CYAN + "CLIENT" + Logging.ANSI_RESET + "][" + packet.getHeader() +"] => " + packet.getMessageBody());

				let handler = new this.incoming[packet.getHeader()]();

				handler.client = client;
				handler.packet = packet;

				handler.handle();
			}else{
				Emulator.getLogging().logPacketLine("[" + Logging.ANSI_CYAN + "CLIENT" + Logging.ANSI_RESET + "]["+ Logging.ANSI_RED +"UNDEFINED" + Logging.ANSI_RESET + "][" + packet.getHeader() +"] => " + packet.getMessageBody());
			}
		}catch(e){
			console.error(e);
		}
	}

	public isRegistered(header: number): boolean {
		return header in this.incoming;
	}

	public registerHandler(header: number, handler: any): void {
		this.incoming[header] = handler;
	}

	public registerHandshake(): void {
		this.registerHandler(Incoming.ReleaseVersionMessageEvent, ReleaseVersionMessageEvent);
		this.registerHandler(Incoming.InitCryptoMessageEvent, InitCryptoMessageEvent);
		this.registerHandler(Incoming.GenerateSecretKeyMessageEvent, GenerateSecretKeyMessageEvent);
	}
}