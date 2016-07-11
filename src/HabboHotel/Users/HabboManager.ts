import Emulator from '../../Emulator';
import Habbo from './Habbo';
import GameClient from '../GameClients/GameClient';

export default class HabboManager {
	private onlineHabbos: Array<Habbo>;

	public constructor() {
		this.onlineHabbos = [];

		Emulator.getLogging().logStart("Habbo Manager -> Loaded!");
	}

	public addHabbo(habbo: Habbo): void {
		//this.onlineHabbos[habbo.getHabboInfo().getId()] = habbo;
	}

	public removeHabbo(habbo: Habbo): void {
		//this.onlineHabbos.slice(habbo.getHabboInfo().getId(), 1);
	}

	public getHabbo(search: number | string): Habbo {
		if(typeof search == 'number'){
			return this.onlineHabbos[<number>search];
		}else if(typeof search == 'string'){
			this.onlineHabbos.forEach(function(habbo: Habbo){
				/*if(search.toString().toLowerCase() === habbo.getHabboInfo().getUsername().toLowerCase()){
					return habbo;
				}*/
			});
		}
	}

	public loadHabbo(sso: string, client: GameClient, cb: (client: GameClient, habbo: Habbo) => void): void {
		Emulator.getDatabase().getPool().getConnection(function(err, connection){
			connection.query('SELECT * FROM users WHERE auth_ticket = ? LIMIT 1', [sso], function(err, rows){
				if(rows.length == 1){
					let row = rows[0];
					let h: Habbo = Emulator.getGameEnvironment().getHabboManager().getHabbo(<number>row.id);

					if(h != null){
						//h.getClient().sendResponse(new GenericAlertComposer("You logged in from somewhere else."));
						//h.getClient().destroy();
						h = null;
					}

					let habbo = new Habbo(row);
					cb(client, habbo);
				}else{
					client.destroy();
				}
				
				connection.release();
			});
		});
	}

	public getOnlineCount(): number {
		return this.onlineHabbos.length;
	}
}