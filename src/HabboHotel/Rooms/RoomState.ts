enum RoomState {
    OPEN, LOCKED, PASSWORD, INVISIBLE
}

namespace RoomState {
    export function valueOf(state: string): RoomState {
        return RoomState[state] ? RoomState[state] : RoomState.OPEN;
    }
}

export default RoomState;
