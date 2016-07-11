export default class ServerMessage {
	private header: number;
	private buffer: Buffer;

	public constructor(header?: number) {
		if(header){
			this.header = header;
			this.buffer = new Buffer(2);
			this.buffer.writeUInt16BE(header, 0);
		}
	}

	public init(header: number): void {
		this.header = header;
		this.buffer = new Buffer(2);
		this.buffer.writeUInt16BE(header, 0);
	}

	public appendRawBytes(buffer: Buffer): void {
		this.buffer = Buffer.concat([this.buffer, buffer]);
	}

	public appendString(str: string): void {
		let buffer: Buffer = new Buffer(str.length + 2);
		buffer.writeUInt16BE(str.length, 0);
		buffer.write(str, 2);

		this.buffer = Buffer.concat([this.buffer, buffer]);
	}

	public appendChar(char: number): void {
		let buffer: Buffer = new Buffer(String.fromCharCode(char));

		this.buffer = Buffer.concat([this.buffer, buffer]);
	}

	public appendInt32(value: number | string | boolean): void {
		let buffer: Buffer = new Buffer(4);

		if(typeof value == 'number'){
			buffer.writeUInt32BE(<number>value, 0);
		}else if(typeof value == 'string'){
			buffer.writeUInt32BE(value.toString().charCodeAt(0), 0);
		}else if(typeof value == 'boolean'){
			buffer.writeUInt32BE(value ? 1 : 0, 0);
		}
		
		this.buffer = Buffer.concat([this.buffer, buffer]);
	}

	public appendInt16(value: number): void {
		let buffer: Buffer = new Buffer(2);
		buffer.writeUInt16BE(value, 0);

		this.buffer = Buffer.concat([this.buffer, buffer]);
	}

	public appendBoolean(value: boolean): void {
		let buffer: Buffer = new Buffer(1);
		buffer.write(String.fromCharCode(value ? 1 : 0), 0);

		this.buffer = Buffer.concat([this.buffer, buffer]);
	}

	public getMessageBody(): string {
		let result: string = "";

		for(let i = 0; i < this.buffer.length; i++){
			if(this.buffer[i] < 31){
				result += "["+this.buffer[i]+"]";
			}else{
				result += String.fromCharCode(this.buffer[i]);
			}
		}

		return result;
	}

	public getHeader(): number {
		return this.header;
	}

	public get(): Buffer {
		let buffer: Buffer = new Buffer(4);
		buffer.writeUInt32BE(this.buffer.length, 0);

		return Buffer.concat([buffer, this.buffer]);
	}
}