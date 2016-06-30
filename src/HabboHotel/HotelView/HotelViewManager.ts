import HallOfFame from './HallOfFame';
import NewsList from './NewsList';
import Emulator from '../../Emulator';

export default class HotelViewManager {
	private hallOfFame: HallOfFame;
	private newsList: NewsList;

	public constructor() {
		this.hallOfFame = new HallOfFame();
		this.newsList = new NewsList();
		/*setTimeout(function(){
			console.log(Emulator.getGameEnvironment().getHotelViewManager().getNewsList().getNewsWidgets());
		}, 2000);*/
		Emulator.getLogging().logStart('Hotelview Manager -> Loaded!');
	}

	public getHallOfFame(): HallOfFame {
		return this.hallOfFame;
	}

	public getNewsList(): NewsList {
		return this.newsList;
	}
}