import Runnable from '../../Threading/Runnable';
import Habbo from '../Users/Habbo';
import Emulator from '../../Emulator';

export default class MessengerBuddy extends Runnable {
    private id: number;
    private username: string;
    private gender: string;
    private online: number;
    private look: string;
    private motto: string;
    private relation: number;
    private inRoom: boolean;;
    private userOne: number = 0;

    public constructor(row) {
        super();
        this.id = <number>row.id;
        this.username = row.username;
        this.gender = row.gender;
        this.online = <number>row.online;
        this.motto = row.motto;
        this.look = row.look;
        this.relation = <number>row.relation;
        this.userOne = <number>row.user_one_id;
        this.inRoom = false;

        if (this.online == 1) {
            let habbo: Habbo = Emulator.getGameEnvironment().getHabboManager().getHabbo(this.username);

            if (habbo != null) {
                //this.inRoom = habbo.getHabboInfo().getCurrentRoom() != null;
            }
        }
    }

    public run(): void {

    }

    public getId(): number {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }

    public getGender(): string {
        return this.gender;
    }

    public getOnline(): number {
        return this.online;
    }

    public getMotto(): string {
        return this.motto;
    }

    public getLook(): string {
        return this.look;
    }

    public getRelation(): number {
        return this.relation;
    }

    public getUserOne(): number {
        return this.userOne;
    }

    public isInRoom(): boolean {
        return this.inRoom;
    }
}
