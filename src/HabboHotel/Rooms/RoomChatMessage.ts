import Habbo from '../Users/Habbo';
import RoomUnit from './RoomUnit';
import MessageHandler from '../../Messages/Incoming/MessageHandler';
import Incoming from '../../Messages/Incoming/Incoming';
import RoomChatMessageBubbles from './RoomChatMessageBubbles';
import ServerMessage from '../../Messages/ServerMessage';

export default class RoomChatMessage {
    private message: string;
    private unfilteredMessage: string;
    private bubble: RoomChatMessageBubbles;
    private habbo: Habbo;
    private targetHabbo: Habbo;
    private roomUnit: RoomUnit;
    private emotion: number;
    private isCommand: boolean = false;
    private filtered: boolean = false;

    public constructor(message: MessageHandler) {
        if (message.packet.getHeader() == Incoming.RoomUserWhisperEvent) {
            let data: string = message.packet.readString();
            this.targetHabbo = message.client.getHabbo().getHabboInfo().getCurrentRoom().getHabbo(data.split(" ")[0]);
            this.message = data.substring(data.split(" ")[0].length + 1, data.length);
        } else {
            this.message = message.packet.readString();
        }

        try {
            this.bubble = RoomChatMessageBubbles.getBubble(message.packet.readInt());
        } catch (e) {
            this.bubble = RoomChatMessageBubbles.NORMAL;
        }

        this.unfilteredMessage = this.message;
        this.habbo = message.client.getHabbo();
        this.roomUnit = this.habbo.getRoomUnit();
        this.checkEmotion();
        //this.filter();
    }

    public checkEmotion(): void {
        this.emotion = 0;
    }

    public serialize(message: ServerMessage): void {
        message.appendInt(this.roomUnit.getId());
        message.appendString(this.getMessage());
        message.appendInt(this.getEmotion());
        message.appendInt(this.getBubble());
        message.appendInt(0);
        message.appendInt(this.getMessage().length);
    }

    public getMessage(): string {
        return this.message;
    }

    public getEmotion(): number {
        return this.emotion;
    }

    public getBubble(): RoomChatMessageBubbles {
        return this.bubble;
    }
}
