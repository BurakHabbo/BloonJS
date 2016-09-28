import GameClient from './GameClient';

export default class GameClientManager {
    private clients: Array<GameClient>;

    public constructor() {
        this.clients = new Array<GameClient>();
    }

    public getSessions(): Array<GameClient> {
        return this.clients;
    }

    public addClient(client: GameClient) {
        this.clients.push(client);
    }
}
