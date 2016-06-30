import Emulator from '../Emulator';
import HabboManager from './Users/HabboManager';
import HotelViewManager from './HotelView/HotelViewManager';

export default class GameEnvironment {
	private habboManager: HabboManager;
	private hotelViewManager: HotelViewManager;

	public load(): void {
		Emulator.getLogging().logStart('GameEnvironment -> Loading...');
		this.habboManager = new HabboManager();
		this.hotelViewManager = new HotelViewManager();

		Emulator.getLogging().logStart('GameEnvironment -> Loaded!');
	}

	public getHabboManager(): HabboManager {
		return this.habboManager;
	}

	public getHotelViewManager(): HotelViewManager {
		return this.hotelViewManager;
	}
}