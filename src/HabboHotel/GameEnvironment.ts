import Emulator from '../Emulator';
import HabboManager from './Users/HabboManager';

export default class GameEnvironment {
	private habboManager: HabboManager;

	public load(): void {
		Emulator.getLogging().logStart('GameEnvironment -> Loading...');
		this.habboManager = new HabboManager();

		Emulator.getLogging().logStart('GameEnvironment -> Loaded!');
	}
}