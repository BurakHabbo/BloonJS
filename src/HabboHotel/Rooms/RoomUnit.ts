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
	private isTeleporting: boolean = false;
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
}