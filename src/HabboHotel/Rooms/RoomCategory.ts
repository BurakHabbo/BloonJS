export default class RoomCategory {
    private id: number;
    private minRank: number;
    private caption: string;
    private canTrade: boolean;
    private maxUserCount: number;
    private official: boolean;

    public constructor(row) {
        this.id = <number>row.id;
        this.minRank = <number>row.min_rank;
        this.caption = row.caption;
        this.canTrade = row.can_trade == 1;
        this.maxUserCount = <number>row.max_user_count;
        this.official = row.public == 1;
    }

    public getId(): number {
        return this.id;
    }

    public getMinRank(): number {
        return this.minRank;
    }

    public getCaption(): string {
        return this.caption;
    }

    public isCanTrade(): boolean {
        return this.canTrade;
    }

    public getMaxUserCount(): number {
        return this.maxUserCount;
    }

    public isPublic(): boolean {
        return this.official;
    }
}
