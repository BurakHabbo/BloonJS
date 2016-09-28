enum RoomChatMessageBubbles {
    NORMAL = 0,
    ALERT = 1,
    BOT = 2,
    RED = 3,
    BLUE = 4,
    YELLOW = 5,
    GREEN = 6,
    BLACK = 7
}

namespace RoomChatMessageBubbles {
    export function getBubble(bubble: number): RoomChatMessageBubbles {
        return RoomChatMessageBubbles[bubble.toString()] ? RoomChatMessageBubbles[bubble.toString()] : RoomChatMessageBubbles.NORMAL;
    }
}

export default RoomChatMessageBubbles;
