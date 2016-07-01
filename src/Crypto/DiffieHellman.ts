import jsbn = require('jsbn');

export default class DiffieHellman {
	private prime: jsbn.BigInteger;
	private generator: jsbn.BigInteger;
	private privateKey: jsbn.BigInteger;
	private publicKey: jsbn.BigInteger;
	private publicClientKey: jsbn.BigInteger;
	private sharedKey: jsbn.BigInteger;

	public generateDH(prime?: string, generator?: string, base?: number): void {
		if(prime){
			this.prime = new jsbn.BigInteger(prime, base ? base : 10);
		}else{
			this.prime = new jsbn.BigInteger("114670925920269957593299136150366957983142588366300079186349531", 10);
		}

		if(generator){
			this.generator = new jsbn.BigInteger(generator, base ? base : 10);
		}else{
			this.generator = new jsbn.BigInteger("1589935137502239924254699078669119674538324391752663931735947", 10);
		}

		this.privateKey = new jsbn.BigInteger(this.randomString(), 16);

		if(this.prime.compareTo(this.generator) == 1){
			let temp: jsbn.BigInteger = this.prime;
			this.prime = this.generator;
			this.generator = temp;
		}

		this.publicKey = this.generator.modPow(this.privateKey, this.prime);
	}

	public randomString(){
		return (Math.floor(Math.random()*1000000000000).toString(16) + Math.floor(Math.random()*1000000000000).toString(16) + Math.floor(Math.random()*1000000000000).toString(16));
	}
}