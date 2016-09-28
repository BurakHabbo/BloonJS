export default class CrackableReward {
    private itemId: number;
    private count: number;
    private prizes: Array<number>;
    private achievementTick: string;
    private achievementCracked: string;

    public constructor(row) {
        this.itemId = <number>row.item_id;
        this.count = <number>row.count;
        this.achievementTick = row.achievement_tick;
        this.achievementCracked = row.achievement_cracked;

        let data: Array<string> = row.prizes.split(";");

        this.prizes = new Array<number>();

        for (let i = 0; i < data.length; i++) {
            this.prizes[i] = parseInt(data[i]);
        }
    }
}
