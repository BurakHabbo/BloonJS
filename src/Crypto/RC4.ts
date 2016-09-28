export default class RC4 {
    private key: Array<number>;
    private table: Array<number>;
    private i: number;
    private j: number;

    public constructor(key?: Array<number>) {
        this.table = new Array<number>();
        if (key) {
            this.init(key);
        }
    }

    public init(key: Array<number>): void {
        this.table = new Array<number>();
        this.key = key;
        this.i = 0;
        while (this.i < 256) {
            this.table.push(this.i++)
        }

        this.i = 0;
        this.j = 0;
        let k = key.length;
        while (this.i < 256) {
            this.j = (((this.j + this.table[this.i]) + key[this.i % k]) % 256);
            this.swap(this.i++, this.j)
        }
        this.i = 0;
        this.j = 0;
    }

    public swap(a: number, b: number): void {
        let k = this.table[a];
        this.table[a] = this.table[b];
        this.table[b] = k;
    }

    public parse(b: Buffer): Buffer {
        let result = new Buffer(b.length);

        for (let a = 0; a < b.length; a++) {
            this.i = ((this.i + 1) % 256);
            this.j = ((this.j + this.table[this.i]) % 256);
            this.swap(this.i, this.j);
            let k = ((this.table[this.i] + this.table[this.j]) % 256);
            result[a] = (b[a] ^ this.table[k]);
        }
        return result;
    }
}
