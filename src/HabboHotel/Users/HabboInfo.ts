import Runnable from '../../Threading/Runnable';
import Emulator from '../../Emulator';
import HabboGender from './HabboGender';

export default class HabboInfo extends Runnable {
	private username: string;
	private realName: string;
	private motto: string;
	private look: string;
	private gender: HabboGender;
	private mail: string;
	private sso: string;
	private ipRegister: string;

	private id: number;
	private accountCreated: number;
	private achievementScore: number;
	private rank: number;

	private credits: number;
	private lastOnline: number;

	private homeRoom: number;

	private online: boolean;
	private loadingRoom: number;
	//private currentRoom: Room;
	private roomQueueId: number;

	//private riding: HorsePet;

	//private currentGame: Game;
	private currencies: Array<number>;
	//private gamePlayer: GamePlayer;

	public constructor(row) {
		super();
		this.username = row.username;
		this.realName = row.real_name;
		this.motto = row.motto;
		this.look = row.look;
		this.gender = row.gender == "F" ? HabboGender.F : HabboGender.M;
		this.mail = row.mail;
		this.sso = row.auth_ticket;
		this.ipRegister = row.ip_register;
		this.rank = <number>row.rank;
		this.accountCreated = <number>row.account_created;
		this.credits = <number>row.credits;
		this.homeRoom = <number>row.home_room;
		this.lastOnline = Emulator.getIntUnixTimestamp();
		this.online = false;
		//this.currentRoom = null;
	}

	public run(): void {

	}
}