import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';
import Emulator from '../../../Emulator';
import HallOfFame from '../../../HabboHotel/HotelView/HallOfFame';
import HallOfFameWinner from '../../../HabboHotel/HotelView/HallOfFameWinner';

export default class HallOfFameComposer extends MessageComposer {

	public constructor() {
		super();
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.HallOfFameComposer);
		let hallOfFame: HallOfFame = Emulator.getGameEnvironment().getHotelViewManager().getHallOfFame();

		this.response.appendString(hallOfFame.getCompetitionName());

		let winners: Array<HallOfFameWinner> = hallOfFame.getWinners();
		let keys = Object.keys(winners);

		this.response.appendInt(keys.length);

		let count: number = 1;

		winners.sort(function(a: HallOfFameWinner, b: HallOfFameWinner){
			if(a.getPoints() > b.getPoints()){
				return 1;
			}else if(b.getPoints() < a.getPoints()){
				return -1;
			}else{
				return 0;
			}
		});

		for(let i = 0; i < keys.length; i++){
			let winner: HallOfFameWinner = winners[i];
			this.response.appendInt(winner.getId());
			this.response.appendString(winner.getUsername());
			this.response.appendString(winner.getLook());
			this.response.appendInt(count);
			this.response.appendInt(winner.getPoints());
			count++;
		}

		return this.response;
	}
}