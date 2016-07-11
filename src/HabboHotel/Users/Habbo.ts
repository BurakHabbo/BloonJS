import GameClient from '../GameClients/GameClient';
import Runnable from '../../Threading/Runnable';
import HabboInfo from './HabboInfo';

export default class Habbo extends Runnable {
	private client: GameClient;
	private habboInfo: HabboInfo;

	private update: boolean;
	private disconnected: boolean;
	private disconnecting: boolean;
	private firstVisit: boolean = false;

	public constructor(row) {
		super();
		this.client = null;
		this.habboInfo = new HabboInfo(row);
		this.update = false;
	}

	public run(): void {

	}

	public getHabboInfo(): HabboInfo {
		return this.habboInfo;
	}

	public setClient(client: GameClient): void {
		this.client = client;
	}
}