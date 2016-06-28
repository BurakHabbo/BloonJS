import net = require('net');

export default class GameServer {
	private host: string;
	private port: number;
	private server: net.Server;

	public constructor(host: string, port: number) {
		this.host = host;
		this.port = port;
	}

	public initialise(): void {
		this.server = net.createServer();
	}

	public connect(): void {
		this.server.listen(this.port, this.host);
	}
}