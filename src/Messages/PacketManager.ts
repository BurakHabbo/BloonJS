import MessageHandler from './Incoming/MessageHandler';
import Incoming from './Incoming/Incoming';
import Outgoing from './Outgoing/Outgoing';
import ReleaseVersionMessageEvent from './Incoming/Handshake/ReleaseVersionMessageEvent';
import InitCryptoMessageEvent from './Incoming/Handshake/InitCryptoMessageEvent';
import GenerateSecretKeyMessageEvent from './Incoming/Handshake/GenerateSecretKeyMessageEvent';
import ClientFlashVarsMessageEvent from './Incoming/Handshake/ClientFlashVarsMessageEvent';
import UniqueIDMessageEvent from './Incoming/Handshake/UniqueIDMessageEvent';
import SSOTicketMessageEvent from './Incoming/Handshake/SSOTicketMessageEvent';
import PingEvent from './Incoming/Handshake/PingEvent';
import HotelViewRequestBonusRareEvent from './Incoming/HotelView/HotelViewRequestBonusRareEvent';
import RequestNewsListEvent from './Incoming/HotelView/RequestNewsListEvent';
import HotelViewDataEvent from './Incoming/HotelView/HotelViewDataEvent';
import RequestFriendRequestsEvent from './Incoming/Friends/RequestFriendRequestsEvent';
import RequestUserDataEvent from './Incoming/Users/RequestUserDataEvent';
import RequestUserCreditsEvent from './Incoming/Users/RequestUserCreditsEvent';
import RequestUserClubEvent from './Incoming/Users/RequestUserClubEvent';
import RequestRoomDataEvent from './Incoming/Rooms/RequestRoomDataEvent';
import RequestRoomLoadEvent from './Incoming/Rooms/RequestRoomLoadEvent';
import RequestRoomHeightmapEvent from './Incoming/Rooms/RequestRoomHeightmapEvent';
import RoomUserSignEvent from './Incoming/Rooms/Users/RoomUserSignEvent';
import RoomUserWalkEvent from './Incoming/Rooms/Users/RoomUserWalkEvent';
import RequestNewNavigatorDataEvent from './Incoming/Navigator/RequestNewNavigatorDataEvent';
import RequestRoomCategoriesEvent from './Incoming/Navigator/RequestRoomCategoriesEvent';
import RequestNewNavigatorRoomsEvent from './Incoming/Navigator/RequestNewNavigatorRoomsEvent';
import GameClient from '../HabboHotel/GameClients/GameClient';
import ClientMessage from './ClientMessage';
import Emulator from '../Emulator';
import Logging from '../Core/Logging';

export default class PacketManager {
	private incoming: Array<any>;
	private outgoingNames: Array<string>;

	public constructor() {
		this.incoming = new Array<any>();

		this.outgoingNames = new Array<string>();
		let keys: Array<string> = Object.keys(Outgoing);

		for(let i = 0; i < keys.length; i++){
			let key: string = keys[i];
			let value: number = Outgoing[key];
			this.outgoingNames[value] = key;
		}
		

		this.registerHandshake();
		this.registerHotelView();
		this.registerFriends();
		this.registerUsers();
		this.registerRooms();
		this.registerNavigator();
	}

	public getOutgoingName(header: number): string {
		return this.outgoingNames[header] ? this.outgoingNames[header] : "NotFoundComposer";
	}

	public handlePacket(client: GameClient, packet: ClientMessage): void {
		if(client == null)
			return;

		try{
			if(this.isRegistered(packet.getHeader())){
				let handler = new this.incoming[packet.getHeader()]();

				//if(Emulator.getConfig().getBoolean('debug.show.packets'))
					Emulator.getLogging().logPacketLine("[" + Logging.ANSI_CYAN + "CLIENT" + Logging.ANSI_RESET + "][" + handler.constructor.name +"] => " + packet.getMessageBody());


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
		this.registerHandler(Incoming.ClientFlashVarsMessageEvent, ClientFlashVarsMessageEvent);
		this.registerHandler(Incoming.UniqueIDMessageEvent, UniqueIDMessageEvent);
		this.registerHandler(Incoming.SSOTicketMessageEvent, SSOTicketMessageEvent);
		this.registerHandler(Incoming.PingEvent, PingEvent);
	}

	public registerHotelView(): void {
		this.registerHandler(Incoming.HotelViewRequestBonusRareEvent, HotelViewRequestBonusRareEvent);
		this.registerHandler(Incoming.RequestNewsListEvent, RequestNewsListEvent);
		this.registerHandler(Incoming.HotelViewDataEvent, HotelViewDataEvent);
	}

	public registerFriends(): void {
		this.registerHandler(Incoming.RequestFriendRequestsEvent, RequestFriendRequestsEvent);
	}

	public registerUsers(): void {
		this.registerHandler(Incoming.RequestUserDataEvent, RequestUserDataEvent);
		this.registerHandler(Incoming.RequestUserCreditsEvent, RequestUserCreditsEvent);
		this.registerHandler(Incoming.RequestUserClubEvent, RequestUserClubEvent);
	}

	public registerRooms(): void {
		this.registerHandler(Incoming.RequestRoomDataEvent, RequestRoomDataEvent);
		this.registerHandler(Incoming.RequestRoomLoadEvent, RequestRoomLoadEvent);
		this.registerHandler(Incoming.RequestRoomHeightmapEvent, RequestRoomHeightmapEvent);
		this.registerHandler(Incoming.RoomUserSignEvent, RoomUserSignEvent);
		this.registerHandler(Incoming.RoomUserWalkEvent, RoomUserWalkEvent);
	}

	public registerNavigator(): void {
		this.registerHandler(Incoming.RequestNewNavigatorDataEvent, RequestNewNavigatorDataEvent);
		this.registerHandler(Incoming.RequestRoomCategoriesEvent, RequestRoomCategoriesEvent);
		this.registerHandler(Incoming.RequestNewNavigatorRoomsEvent, RequestNewNavigatorRoomsEvent);
	}
}