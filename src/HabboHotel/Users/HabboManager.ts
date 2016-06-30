import Emulator from '../../Emulator';
import Habbo from './Habbo';

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

	public getOnlineCount(): number {
		return this.onlineHabbos.length;
	}
}