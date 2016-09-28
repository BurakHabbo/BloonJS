export default class GuildPart {
    private id: number;
    private valueA: string;
    private valueB: string;

    public constructor(row) {
        this.id = <number>row.id;
        this.valueA = row.firstvalue;
        this.valueB = row.secondvalue;
    }

    public getId(): number {
        return this.id;
    }

    public getValueA(): string {
        return this.valueA;
    }

    public getValueB(): string {
        return this.valueB;
    }
}
