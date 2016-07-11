import net = require('net');
import jsbn = require('jsbn');
import rsa = require('rsa');
import GameClientManager from '../../HabboHotel/GameClients/GameClientManager';
import PacketManager from '../../Messages/PacketManager';
import GameClient from '../../HabboHotel/GameClients/GameClient';
import ClientMessage from '../../Messages/ClientMessage';
import Emulator from '../../Emulator';
import RSAKey from '../../Crypto/RSAKey';

export default class GameServer {
	private gameClientManager: GameClientManager;
	private packetManager: PacketManager;
	private rsa: rsa.RSA;
	private host: string;
	private port: number;
	private server: net.Server;

	public constructor(host: string, port: number) {
		this.gameClientManager = new GameClientManager();
		this.packetManager = new PacketManager();
		this.rsa = new rsa.RSA();
		this.rsa.setPrivate(RSAKey.N, RSAKey.E, RSAKey.D);

		this.host = host;
		this.port = port;
	}

	public initialise(): void {
		this.server = net.createServer();
		this.server.on('connection', this.handleConnection);
	}

	public handleConnection(c: GameClient): void {
		Emulator.getGameServer().getGameClientManager().addClient(c);

		c.initDH = new GameClient().initDH;
		c.getDiffieHellman = new GameClient().getDiffieHellman;
		c.sendResponse = new GameClient().sendResponse;
		c.getRC4client = new GameClient().getRC4client;
		c.getRC4server = new GameClient().getRC4server;
		c.isRC4initialized = new GameClient().isRC4initialized;
		c.initRC4 = new GameClient().initRC4;

		c.on('data', function(buffer: Buffer){

			if(buffer.length < 4){
				c.destroy();
				return;
			}

			if(buffer.readUInt32BE(0) == 1014001516 && buffer.readUInt16BE(4) == 26979){
				c.write(new Buffer('<?xml version="1.0"?><!DOCTYPE cross-domain-policy SYSTEM "/xml/dtds/cross-domain-policy.dtd"><cross-domain-policy><allow-access-from domain="*" to-ports="*" /></cross-domain-policy>' + String.fromCharCode(0)));
				return;
			}

			if(c.isRC4initialized()){
				buffer = c.getRC4client().parse(buffer);
			}

			let countPackets: number = 0;
			let maxPackets: number = 15;

			while(buffer.length > 3){
				if(countPackets++ >= maxPackets){
					c.destroy();
					return;
				}

				let length: number = buffer.readUInt32BE(0) + 4;
				
				Emulator.getGameServer().getPacketManager().handlePacket(c, new ClientMessage(buffer.readUInt16BE(4), buffer.slice(6, length)));

				buffer = buffer.slice(length);
			}
		});

		c.on('error', function(){

		});

		console.log(c.remoteAddress, c.remotePort);
	}

	public connect(): void {
		this.server.listen(this.port, this.host);
	}

	public getGameClientManager(): GameClientManager {
		return this.gameClientManager;
	}

	public getPacketManager(): PacketManager {
		return this.packetManager;
	}

	public getRsa(): rsa.RSA {
		return this.rsa;
	}
}