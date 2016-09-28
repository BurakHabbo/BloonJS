import ItemInteraction from './ItemInteraction';

export default class Item {
    private id: number;
    private spriteId: number;
    private name: string;
    private type: string;
    private width: number;
    private length: number;
    private height: number;
    private allowStack: boolean;
    private allowWalk: boolean;
    private allowSit: boolean;
    private allowLay: boolean;
    private allowRecycle: boolean;
    private allowTrade: boolean;
    private allowMarketplace: boolean;
    private allowGift: boolean;
    private allowInventoryStack: boolean;
    private stateCount: number;
    private effectM: number;
    private effectF: number;
    private vendingItems: Array<number>;
    private multiHeights: Array<number>;

    private interactionType: ItemInteraction;

    public constructor(row) {
        this.load(row);
    }

    public update(row): void {
        this.load(row);
    }

    public load(row): void {
        this.id = <number>row.id;
        this.spriteId = <number>row.sprite_id;
        this.name = row.item_name;
        this.type = row.type;
        this.width = <number>row.width;
        this.length = <number>row.length;
        this.height = <number>row.stack_height;
        this.allowStack = row.allow_stack == 1;
        this.allowWalk = row.allow_walk == 1;
        this.allowSit = row.allow_sit == 1;
        this.allowLay = row.allow_lay == 1;
        this.allowRecycle = row.allow_recycle == 1;
        this.allowTrade = row.allow_trade == 1;
        this.allowMarketplace = row.allow_marketplace_sell == 1;
        this.allowGift = row.allow_gift == 1;
        this.allowInventoryStack = row.allow_inventory_stack == 1;

        //this.interactionType = Emulator.getGameEnvironment().getItemManager().getItemInteraction(set.getString("interaction_type").toLowerCase());

        this.stateCount = <number>row.interaction_modes_count;
        this.effectM = <number>row.effect_id_male;
        this.effectF = <number>row.effect_id_female;
    }
}
