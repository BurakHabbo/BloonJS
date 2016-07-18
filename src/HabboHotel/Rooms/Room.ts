import RoomLayout from './RoomLayout';
import Emulator from '../../Emulator';
import Habbo from '../Users/Habbo';
import RoomState from './RoomState';
import RoomOwnerComposer from '../../Messages/Outgoing/Rooms/RoomOwnerComposer';
import RoomRightsComposer from '../../Messages/Outgoing/Rooms/RoomRightsComposer';
import RoomRightLevels from './RoomRightLevels';
import ServerMessage from '../../Messages/ServerMessage';

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
	private allowPetsEat: boolean;
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
		this.ownerId = <number>row.owner_id;
		this.ownerName = row.owner_name;
		this.name = row.name;
		this.description = row.description;
		this.layout = Emulator.getGameEnvironment().getRoomManager().getLayout(row.model);
		this.password = row.password;
		this.state = RoomState.valueOf(row.state.toUpperCase());
		this.usersMax = <number>row.users_max;
		this.score = <number>row.score;
		this.category = <number>row.category;
		this.floorPaint = row.paper_floor;
		this.wallPaint = row.paper_wall;
		this.backgroundPaint = row.paper_landscape;
		this.wallSize = <number>row.thickness_wall;
		this.wallHeight = <number>row.wall_height;
		this.floorSize = <number>row.thickness_floor;
		this.tags = row.tags;
		this.publicRoom = row.is_public == 1;
		this.staffPromotedRoom = row.is_staff_picked == 1;
		this.allowPets = row.allow_other_pets == 1;
		this.allowPetsEat = row.allow_other_pets_eat == 1;
		this.allowWalkthrough = row.allow_walkthrough == 1;
		this.hideWall = row.allow_hidewall == 1;
		this.chatMode = <number>row.chat_mode;
		this.chatWeight = <number>row.chat_weight;
		this.chatSpeed = <number>row.chat_speed;
		this.chatDistance = <number>row.chat_hearing_distance;
		this.chatProtection = <number>row.chat_protection;
		this.muteOption = <number>row.who_can_mute;
		this.kickOption = <number>row.who_can_kick;
		this.banOption = <number>row.who_can_ban;
		this.pollId = <number>row.poll_id;
		this.guild = <number>row.guild_id;
		this.rollerSpeed = <number>row.roller_speed;
		this.overrideModel = row.override_model == 1;
		if(this.overrideModel){

		}

		this.promoted = row.promoted == 1;
		if(this.promoted){

		}

		this.tradeMode = <number>row.trade_mode;
		this.preLoaded = true;
		this.allowBotsWalk = true;

		this.currentHabbos = new Array<Habbo>();
		this.habboQueue = new Array<Habbo>();
		//this.currentBots = new Array<Bot>();
		//this.currentPets = new Array<AbstractPet>();
		this.furniOwnerNames = new Array<string>();
		this.furniOwnerCount = new Array<number>();
		//this.roomItems = new Array<HabboItem>();
		this.wordFilterWords = new Array<string>();
		//this.moodlightData = new Array<RoomMoodlightData>();

		this.mutedHabbos = new Array<number>();
		//this.bannedHabbos = new Array<RoomBan>();
		//this.games = new Array<Game>();
		//this.activeTrades = new Array<RoomTrade>();
		this.rights = new Array<number>();
		this.wiredHighscoreData = new Array();

		this.loadData();
	}

	public loadData(): void {
		this.unitCounter = 0;
	}

	public getId(): number {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public isPublicRoom(): boolean {
		return this.publicRoom;
	}

	public getOwnerId(): number {
		return this.ownerId;
	}

	public getOwnerName(): string {
		return this.ownerName;
	}

	public getState(): RoomState {
		return this.state;
	}

	public getUsersCount(): number {
		return this.currentHabbos.length;
	}

	public getUsersMax(): number {
		return this.usersMax;
	}

	public getDescription(): string {
		return this.description;
	}

	public getScore(): number {
		return this.score;
	}

	public getCategory(): number {
		return this.category;
	}

	public getTags(): string {
		return this.tags;
	}

	public getGuildId(): number {
		return this.guild;
	}

	public isPromoted(): boolean {
		return this.promoted;
	}

	public isStaffPromotedRoom(): boolean {
		return this.staffPromotedRoom;
	}

	public isMuted(): boolean {
		return this.muted;
	}

	public getMuteOption(): number {
		return this.muteOption;
	}

	public getKickOption(): number {
		return this.kickOption;
	}

	public getBanOption(): number {
		return this.banOption;
	}

	public getChatMode(): number {
		return this.chatMode;
	}

	public getChatWeight(): number {
		return this.chatWeight;
	}

	public getChatSpeed(): number {
		return this.chatSpeed;
	}

	public getChatDistance(): number {
		return this.chatDistance;
	}

	public getChatProtection(): number {
		return this.chatProtection;
	}

	public getLayout(): RoomLayout {
		return this.layout;
	}

	public getFloorPaint(): string {
		return this.floorPaint;
	}

	public getWallPaint(): string {
		return this.wallPaint;
	}

	public getBackgroundPaint(): string {
		return this.backgroundPaint;
	}

	public getWallHeight(): number {
		return this.wallHeight;
	}

	public isOwner(habbo: Habbo): boolean {
		return habbo.getHabboInfo().getId() == this.ownerId || habbo.hasPermission("acc_anyroomowner");
	}

	public hasRights(habbo: Habbo): boolean {
		return this.isOwner(habbo) || this.rights.indexOf(habbo.getHabboInfo().getId()) > -1;
	}

	public isBanned(value: Habbo | number): boolean {
		if(value instanceof Habbo){
			return this.isBanned(value.getHabboInfo().getId());
		}else if(typeof value == "number"){
			//let ban: RoomBan = this.bannedHabbos[value];
			//return ban != null && ban.endTimestamp >= Emulator.getIntUnixTimestamp();
			return false;
		}
	}

	public refreshRightsForHabbo(habbo: Habbo): void {
		habbo.getClient().sendResponse(new RoomOwnerComposer());
        habbo.getClient().sendResponse(new RoomRightsComposer(RoomRightLevels.MODERATOR));
        //habbo.getRoomUnit().getStatus().put("flatctrl", RoomRightLevels.MODERATOR.level + "");
        //habbo.getClient().sendResponse(new RoomRightsListComposer(this));
	}

	public addHabbo(habbo: Habbo): void {
		this.currentHabbos[habbo.getHabboInfo().getId()] = habbo;
		this.unitCounter++;
	}

	public getUnitCounter(): number {
		return this.unitCounter;
	}

	public sendComposer(message: ServerMessage): void {
		let keys = Object.keys(this.currentHabbos);

		for(let i = 0; i < keys.length; i++){
			this.currentHabbos[keys[i]].getClient().sendResponse(message);
		}
	}
}