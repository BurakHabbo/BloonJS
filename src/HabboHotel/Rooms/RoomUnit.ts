import RoomUserRotation from './RoomUserRotation';
import DanceType from '../Users/DanceType';
import RoomUnitType from './RoomUnitType';
import Room from './Room';
import PathFinder from '../../Util/Pathfinding/PathFinder';
import Node from '../../Util/Pathfinding/Node';
import Emulator from '../../Emulator';
import Habbo from '../Users/Habbo';
import Rotation from '../../Util/Pathfinding/Rotation';
import RoomUserStatusComposer from '../../Messages/Outgoing/Rooms/Users/RoomUserStatusComposer';
import Pathfinding = require('pathfinding');

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
    private canIWalk: boolean;
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

    public constructor() {
        this.id = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0.0;
        this.inRoom = false;
        this.canIWalk = true;
        this.status = new Array<string>();
        this.cacheable = new Array<Object>();
        this.roomUnitType = RoomUnitType.UNKNOWN;
        this.bodyRotation = RoomUserRotation.NORTH;
        this.bodyRotation = RoomUserRotation.NORTH;
        this.danceType = DanceType.NONE;
        this.pathFinder = new PathFinder(this);
        this.handItem = 0;
        this.handItemTimestamp = 0;
        this.walkTimeOut = Emulator.getIntUnixTimestamp();
        this.effectId = 0;
        this.wiredMuted = false;
        this.modMuted = false;
    }

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
        this.pathFinder.setRoom(room);
    }

    public resetIdleTimer(): void {
        this.idleTimer = 0;
    }

    public isTeleporting(): boolean {
        return this.isCurrentlyTeleporting;
    }

    public isCmdTeleport(): boolean {
        return this.cmdTeleport;
    }

    public stopWalking(): void {
        this.removeStatus("mv");
        this.setGoalLocation(this.x, this.y);
    }

    public setGoalLocation(x: number, y: number): void {
        this.startX = this.x;
        this.startY = this.y;
        this.tilesWalked = 0;
        this.goalX = x;
        this.goalY = y;
        this.pathFinder.findPath();
        this.cmdSit = false;
    }

    public isAtGoal(): boolean {
        return this.goalX == this.x && this.goalY == this.y;
    }

    public isWalking(): boolean {
        return (this.goalX != this.x || this.goalY != this.y) && this.canIWalk;
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

    public getGoalX(): number {
        return this.goalX;
    }

    public getGoalY(): number {
        return this.goalY;
    }

    public getBodyRotation(): RoomUserRotation {
        return this.bodyRotation;
    }

    public getHeadRotation(): RoomUserRotation {
        return this.headRotation;
    }

    public getStatus(): Array<string> {
        return this.status;
    }

    public containsStatus(status: string): boolean {
        return status in this.status;
    }

    public removeStatus(status: string): void {
        delete this.status[status];
    }

    public addStatus(status: string, value: string): void {
        this.status[status] = value;
    }

    public getCacheable(key: string): Object {
        return this.cacheable[key] ? this.cacheable[key] : null;
    }

    public removeCacheable(key: string): void {
        delete this.cacheable[key];
    }

    public getIdleTimer(): number {
        return this.idleTimer;
    }

    public isIdle(): boolean {
        return this.idleTimer > Emulator.getConfig().getInt("hotel.roomuser.idle.cycles", 240);
    }

    public increaseIdleTimer(): void {
        this.idleTimer++;
    }

    public isInRoom(): boolean {
        return this.inRoom;
    }

    public canWalk(): boolean {
        return this.canIWalk;
    }

    public getPathFinder(): PathFinder {
        return this.pathFinder;
    }

    public setRotation(rotation: RoomUserRotation): void {
        this.bodyRotation = rotation;
        this.headRotation = rotation;
    }

    public canTalk(): boolean {
        if (this.wiredMuted)
            return false;

        return !this.isModMuted();
    }

    public isModMuted(): boolean {
        if (this.modMuted) {
            if (this.modMuteTime < Emulator.getIntUnixTimestamp()) {
                this.modMuted = false;
            }
        }

        return this.modMuted;
    }

    public cycle(room: Room): boolean {
        if (!this.isWalking())
            return false;

        if (this.containsStatus("mv")) {
            this.removeStatus("mv");
        }
        if (this.containsStatus("lay")) {
            this.removeStatus("lay");
        }
        if (this.containsStatus("sit")) {
            this.removeStatus("sit");
        }

        if (this.pathFinder == null)
            return true;

        if (this.fastWalk && this.getPathFinder().getPath().length >= 3) {
            this.getPathFinder().getPath().shift();
            this.getPathFinder().getPath().shift();
        }

        let next: Array<number> = this.getPathFinder().getPath().shift();

        if (next == null)
            return true;

        let nextX: number = next[0];
        let nextY: number = next[1];

        let habbo: Habbo = room.getHabbo(this);

        if (this.containsStatus("ded")) {
            this.removeStatus("ded");
        }

        if (habbo != null) {
            if (this.isIdle()) {
                room.unIdle(habbo);
                this.idleTimer = 0;
            }
        }

        let zHeight: number = 0.0;

        this.tilesWalked++;

        let oldRotation: RoomUserRotation = this.getBodyRotation();
        this.setRotation(Rotation.calculate(this.getX(), this.getY(), nextX, nextY));

        zHeight += room.getLayout().getHeightAtSquare(nextX, nextY);


        this.addStatus("mv", nextX + "," + nextY + "," + zHeight.toFixed(1));
        room.sendComposer(new RoomUserStatusComposer(this).compose());

        this.setZ(zHeight);
        this.setX(nextX);
        this.setY(nextY);
        this.resetIdleTimer();

        return false;
    }
}
