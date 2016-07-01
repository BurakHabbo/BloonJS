import GameClient from './GameClient';

export default class GameClientManager {
	private clients: Array<GameClient>;

	public constructor(){
		this.clients = [];
	}

	public getSessions(): Array<GameClient> {
		return this.clients;
	}

	public addClient(client: GameClient) {
		this.clients.push(client);
	}
}