import net = require('net');
import Habbo from '../Users/Habbo';
import DiffieHellman from '../../Crypto/DiffieHellman';

export default class GameClient extends net.Socket {
	private habbo: Habbo;
	private diffieHellman: DiffieHellman;

	public constructor(){
		super();
	}

	public initDH(): void {
		this.diffieHellman = new DiffieHellman();
		this.diffieHellman.generateDH();
	}

	public getDiffieHellman(): DiffieHellman {
		return this.diffieHellman;
	}
}