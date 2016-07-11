import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import HabboManager from '../../../HabboHotel/Users/HabboManager';
import Habbo from '../../../HabboHotel/Users/Habbo';
import GameClient from '../../../HabboHotel/GameClients/GameClient';

export default class SSOTicketMessageEvent extends MessageHandler {
	public handle(): void {
		let sso: string = this.packet.readString();

		if(sso.trim().length < 4 || !this.client.isRC4initialized() || this.client.getMachineId() == null){
			this.client.destroy();
			return;
		}

		Emulator.getGameEnvironment().getHabboManager().loadHabbo(sso, this.client, function(client: GameClient, habbo: Habbo){
			console.log(habbo.getHabboInfo());
		});
	}
}