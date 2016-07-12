import GameClient from '../GameClients/GameClient';
import Runnable from '../../Threading/Runnable';
import HabboInfo from './HabboInfo';
import Messenger from '../Messenger/Messenger';

export default class Habbo extends Runnable {
	private client: GameClient;
	private habboInfo: HabboInfo;
	private messenger: Messenger;

	private update: boolean;
	private disconnected: boolean;
	private disconnecting: boolean;
	private firstVisit: boolean = false;

	public constructor(row) {
		super();
		this.client = null;
		this.habboInfo = new HabboInfo(row);

		this.messenger = new Messenger();
		this.messenger.loadFriends(this);
		this.messenger.loadFriendRequests(this);

		this.update = false;
	}

	public run(): void {

	}

	public getHabboInfo(): HabboInfo {
		return this.habboInfo;
	}

	public getMessenger(): Messenger {
		return this.messenger;
	}

	public setClient(client: GameClient): void {
		this.client = client;
	}

	public getClient(): GameClient {
		return this.client;
	}
}