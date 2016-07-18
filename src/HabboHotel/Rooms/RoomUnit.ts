import RoomUserRotation from './RoomUserRotation';
import DanceType from '../Users/DanceType';
import RoomUnitType from './RoomUnitType';
import Room from './Room';
import PathFinder from '../../Util/Pathfinding/PathFinder';

export default class RoomUnit {
	private id: number;
	private x: number;
	private y: number;
	private z: number;

	private startX: number;
	private startY: number;
	private tilesWalked: number;
	private goalX: number;
	private goalY: number;

	private inRoom: boolean;
	private canWalk: boolean;
	private fastWalk: boolean = false;
	private animateWalk: boolean = false;
	private cmdTeleport: boolean = false;
	private cmdSit: boolean = false;
	private cmdLay: boolean = false;
	private sitUpdate: boolean = false;
	private isCurrentlyTeleporting: boolean = false;
	private talkTimeOut: number;
	private talkCounter: number;

	private status: Array<string>;
	private cacheable: Array<Object>;
	private bodyRotation: RoomUserRotation;
	private headRotation: RoomUserRotation;
	private danceType: DanceType;
	private roomUnitType: RoomUnitType;
	private pathFinder: PathFinder;
	private handItem: number;
	private handItemTimestamp: number;
	private walkTimeOut: number;
	private effectId: number;

	private wiredMuted: boolean;
	private modMuted: boolean;
	private modMuteTime: number;
	private idleTimer: number;
	private room: Room;

	public clearStatus(): void {
		this.status = new Array<string>();
	}

	public setInRoom(inRoom: boolean): void {
		this.inRoom = inRoom;
	}

	public setHandItem(handItem: number): void {
		this.handItem = handItem;
		this.handItemTimestamp = Date.now();
	}

	public setEffectId(effectId: number): void {
		this.effectId = effectId;
	}

	public setPathFinder(pathFinder: PathFinder): void {
		this.pathFinder = pathFinder;
	}

	public setPathFinderRoom(room: Room): void {
		//this.pathFinder.setRoom(room);
	}

	public resetIdleTimer(): void {
		this.idleTimer = 0;
	}

	public isTeleporting(): boolean {
		return this.isCurrentlyTeleporting;
	}

	public setGoalLocation(x: number, y: number): void {
		this.startX = this.x;
		this.startY = this.y;
		this.tilesWalked = 0;
		this.goalX = x;
		this.goalY = y;
		//this.pathFinder.findPath();
		this.cmdSit = false;
	}

	public setX(x: number): void {
		this.x = x;
	}

	public setY(y: number): void {
		this.y = y;
	}

	public setZ(z: number): void {
		this.z = z;
	}

	public setBodyRotation(bodyRotation: RoomUserRotation): void {
		this.bodyRotation = bodyRotation;
	}

	public setHeadRotation(headRotation: RoomUserRotation): void {
		this.headRotation = headRotation;
	}

	public setId(id: number): void {
		this.id = id;
	}

	public getId(): number {
		return this.id;
	}

	public getX(): number {
		return this.x;
	}

	public getY(): number {
		return this.y;
	}

	public getZ(): number {
		return this.z;
	}

	public getBodyRotation(): RoomUserRotation {
		return this.bodyRotation;
	}
}