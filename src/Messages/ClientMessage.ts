export default class ClientMessage {
    private header: number;
    private buffer: Buffer;

    public constructor(header: number, buffer: Buffer) {
        this.header = header;
        this.buffer = buffer;
    }

    public getHeader(): number {
        return this.header;
    }

    public getMessageBody(): string {
        let result: string = "";

        for (let i = 0; i < this.buffer.length; i++) {
            if (this.buffer[i] < 31) {
                result += "[" + this.buffer[i] + "]";
            } else {
                result += String.fromCharCode(this.buffer[i]);
            }
        }

        return result;
    }

    public readShort(): number {
        try {
            let short: number = this.buffer.readUInt16BE(0);
            this.buffer = this.buffer.slice(2);

            return short;
        } catch (e) {
        }

        return -1;
    }

    public readInt(): number {
        try {
            let int: number = this.buffer.readUInt32BE(0);
            this.buffer = this.buffer.slice(4);

            return int;
        } catch (e) {
        }
        return -1;
    }

    public readBoolean(): boolean {
        try {
            let bool: boolean = this.buffer[0] == 1;
            this.buffer = this.buffer.slice(1);

            return bool;
        } catch (e) {
        }

        return false;
    }

    public readString(): string {
        try {
            let length: number = this.readShort();
            let str: string = this.buffer.slice(0, length).toString();
            this.buffer = this.buffer.slice(length);

            return str;
        } catch (e) {
        }

        return null;
    }
}
