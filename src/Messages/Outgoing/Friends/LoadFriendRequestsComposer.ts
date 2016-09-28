import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';
import FriendRequest from '../../../HabboHotel/Messenger/FriendRequest';

export default class LoadFriendRequestsComposer extends MessageComposer {
    private habbo: Habbo;

    public constructor(habbo: Habbo) {
        super();
        this.habbo = habbo;
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.LoadFriendRequestsComposer);

        let requests: Array<FriendRequest> = this.habbo.getMessenger().getFriendRequests();

        this.response.appendInt(requests.length);
        this.response.appendInt(requests.length);

        for (let i = 0; i < requests.length; i++) {
            let request: FriendRequest = requests[i];
            this.response.appendInt(request.getId());
            this.response.appendString(request.getUsername());
            this.response.appendString(request.getLook());
        }

        return this.response;
    }
}
