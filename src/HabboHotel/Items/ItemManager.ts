import Emulator from '../../Emulator';
import Item from './Item';
import CrackableReward from './CrackableReward';
import ItemInteraction from './ItemInteraction';
import SoundTrack from './SoundTrack';

export default class ItemManager {
	private items: Array<Item>;
	private crackableRewards: Array<CrackableReward>;
	private interactionsList: Array<ItemInteraction>;
	private soundTracks: Array<SoundTrack>;

	public constructor() {
		this.items = new Array<Item>();
		this.crackableRewards = new Array<CrackableReward>();
		this.interactionsList = new Array<ItemInteraction>();
		this.soundTracks = new Array<SoundTrack>();
	}

	public load(): void {
		this.loadItemInteractions();
		this.loadItems();
		this.loadCrackable();
		this.loadSoundTracks();

		Emulator.getLogging().logStart("Item Manager -> Loaded!");
	}

	public loadItemInteractions(): void {

	}

	public loadItems(): void {
		Emulator.getDatabase().getPool().getConnection(function(err, connection){
			connection.query('SELECT * FROM items_base ORDER BY id DESC', function(err, rows){
				for(let i = 0; i < rows.length; i++){
					let row = rows[i];
					Emulator.getGameEnvironment().getItemManager().putItem(<number>row.id, new Item(row));
				}

				connection.release();
			});
		});
	}

	public loadCrackable(): void {
		Emulator.getDatabase().getPool().getConnection(function(err, connection){
			connection.query('SELECT * FROM items_crackable', function(err, rows){
				for(let i = 0; i < rows.length; i++){
					let row = rows[i];
					Emulator.getGameEnvironment().getItemManager().putCrackable(<number>row.item_id, new CrackableReward(row));
				}

				connection.release();
			});
		});
	}

	public loadSoundTracks(): void {
		Emulator.getDatabase().getPool().getConnection(function(err, connection){
			connection.query('SELECT * FROM soundtracks', function(err, rows){
				for(let i = 0; i < rows.length; i++){
					let row = rows[i];
					Emulator.getGameEnvironment().getItemManager().putSoundTrack(row.code, new SoundTrack(row));
				}

				connection.release();
			});
		});
	}

	public putItem(id: number, item: Item): void {
		this.items[id] = item;
	}

	public putCrackable(id: number, crackable: CrackableReward): void {
		this.crackableRewards[id] = crackable;
	}

	public putSoundTrack(id: string, soundTrack: SoundTrack): void {
		this.soundTracks[id] = soundTrack;
	}
}