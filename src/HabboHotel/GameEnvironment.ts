import Emulator from '../Emulator';
import HabboManager from './Users/HabboManager';
import HotelViewManager from './HotelView/HotelViewManager';
import GuildManager from './Guilds/GuildManager';
import ItemManager from './Items/ItemManager';
import CatalogManager from './Catalog/CatalogManager';
import RoomManager from './Rooms/RoomManager';
import NavigatorManager from './Navigation/NavigatorManager';

export default class GameEnvironment {
	private habboManager: HabboManager;
	private hotelViewManager: HotelViewManager;
	private guildManager: GuildManager;
	private itemManager: ItemManager;
	private catalogManager: CatalogManager;
	private roomManager: RoomManager;
	private navigatorManager: NavigatorManager;

	public load(): void {
		Emulator.getLogging().logStart('GameEnvironment -> Loading...');
		this.habboManager = new HabboManager();
		this.hotelViewManager = new HotelViewManager();
		this.guildManager = new GuildManager();
		this.itemManager = new ItemManager();
		this.itemManager.load();
		this.catalogManager = new CatalogManager();
		this.roomManager = new RoomManager();
		this.navigatorManager = new NavigatorManager();

		Emulator.getLogging().logStart('GameEnvironment -> Loaded!');
	}

	public getHabboManager(): HabboManager {
		return this.habboManager;
	}

	public getHotelViewManager(): HotelViewManager {
		return this.hotelViewManager;
	}

	public getGuildManager(): GuildManager {
		return this.guildManager;
	}

	public getItemManager(): ItemManager {
		return this.itemManager;
	}

	public getCatalogManager(): CatalogManager {
		return this.catalogManager;
	}

	public getRoomManager(): RoomManager {
		return this.roomManager;
	}

	public getNavigatorManager(): NavigatorManager {
		return this.navigatorManager;
	}
}