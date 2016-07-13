import RoomLayout from './RoomLayout';
import Emulator from '../../Emulator';
import Habbo from '../Users/Habbo';
import RoomState from './RoomState';

export default class Room {
	private id: number;
	private ownerId: number;
	private ownerName: string;
	private name: string;
	private description: string;
	private layout: RoomLayout;
	private overrideModel: boolean;
	private password: string;
	private state: RoomState;
	private usersMax: number;
	private score: number;
	private category: number;

	private floorPaint: string;
	private wallPaint: string;
	private backgroundPaint: string;

	private wallSize: number;
	private wallHeight: number;
	private floorSize: number;

	private guild: number;

	private tags: string;
	private publicRoom: boolean;
	private staffPromotedRoom: boolean;
	private allowPets: boolean;
	private allowWalkthrough: boolean;
	private allowBotsWalk: boolean;
	private hideWall: boolean;
	private chatMode: number;
	private chatWeight: number;
	private chatSpeed: number;
	private chatDistance: number;
	private chatProtection: number;
	private muteOption: number;
	private kickOption: number;
	private banOption: number;
	private pollId: number;
	private promoted: boolean;
	private tradeMode: number;

	private currentHabbos: Array<Habbo>;
	private habboQueue: Array<Habbo>;
	//private currentBots: Array<Bot>;
	//private currentPets: Array<AbstractPet>;
	//private activeTrades: Array<RoomTrade>;
	private rights: Array<number>;
	private mutedHabbos: Array<number>;
	//private bannedHabbos: Array<RoomBan>;
	//private games: Array<Game>;
	private furniOwnerNames: Array<string>;
	private furniOwnerCount: Array<number>;
	//private moodlightData: Array<RoomMoodlightData>;
	private wordFilterWords: Array<string>;
	//private roomItems: Array<HabboItem>;
	private wiredHighscoreData: any;
	//private promotion: RoomPromotion;

	private needsUpdate: boolean;
	private loaded: boolean;
	private preLoaded: boolean;
	private idleCycles: number;
	private unitCounter: number;
	private rollerSpeed: number;
	private lastRollerCycle = Date.now();
	private lastTimerReset = Emulator.getIntUnixTimestamp();
	private muted: boolean;

	private gameMap: any;

	//private roomSpecialTypes: RoomSpecialTypes;

	private loadLock: Object = new Object();

	private preventUnloading: boolean = false;
	private preventUncaching: boolean = false;

	public constructor(row) {
		this.id = <number>row.id;
	}
}