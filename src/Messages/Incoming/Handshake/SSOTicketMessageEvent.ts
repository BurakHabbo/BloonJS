import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import HabboManager from '../../../HabboHotel/Users/HabboManager';
import Habbo from '../../../HabboHotel/Users/Habbo';
import GameClient from '../../../HabboHotel/GameClients/GameClient';
import ServerMessage from '../../ServerMessage';
import AuthenticationOKMessageComposer from '../../Outgoing/Handshake/AuthenticationOKMessageComposer';
import UserHomeRoomComposer from '../../Outgoing/Users/UserHomeRoomComposer';
import UserPermissionsComposer from '../../Outgoing/Users/UserPermissionsComposer';
import MessengerInitComposer from '../../Outgoing/Friends/MessengerInitComposer';
import FriendsComposer from '../../Outgoing/Friends/FriendsComposer';
import UserClubComposer from '../../Outgoing/Users/UserClubComposer';
import UserAchievementScoreComposer from '../../Outgoing/Users/UserAchievementScoreComposer';
import NewUserIdentityComposer from '../../Outgoing/Unknown/NewUserIdentityComposer';
import UserPerksComposer from '../../Outgoing/Users/UserPerksComposer';
import SessionRightsComposer from '../../Outgoing/Unknown/SessionRightsComposer';
import FavoriteRoomsCountComposer from '../../Outgoing/Generic/FavoriteRoomsCountComposer';
import UserEffectsListComposer from '../../Outgoing/Users/UserEffectsListComposer';

export default class SSOTicketMessageEvent extends MessageHandler {
    public handle(): void {
        let sso: string = this.packet.readString();

        if (this.packet.readInt() == -1) {
            return this.client.permBan();
        }

        if (sso.trim().length < 4 || !this.client.isRC4initialized() || this.client.getMachineId() == null) {
            return this.client.permBan();
        }

        Emulator.getGameEnvironment().getHabboManager().loadHabbo(sso, this.client, function(client: GameClient, habbo: Habbo) {
            habbo.setClient(client);
            client.setHabbo(habbo);
            //client.getHabbo().connect();
            //Emulator.getThreading().run(habbo);
            Emulator.getGameEnvironment().getHabboManager().addHabbo(habbo);

            let messages: Array<ServerMessage> = new Array<ServerMessage>();
            messages.push(new AuthenticationOKMessageComposer().compose());
            messages.push(new UserHomeRoomComposer(habbo.getHabboInfo().getHomeRoom(), 0).compose());
            messages.push(new UserPermissionsComposer(habbo).compose());
            messages.push(new MessengerInitComposer().compose());
            //messages.push(new FriendsComposer(habbo).compose());//sended on other callback due to delay getting data
            messages.push(new UserClubComposer(habbo).compose());
            messages.push(new UserAchievementScoreComposer(habbo).compose());
            messages.push(new NewUserIdentityComposer().compose());
            messages.push(new UserPerksComposer().compose());
            messages.push(new SessionRightsComposer().compose());
            messages.push(new FavoriteRoomsCountComposer().compose());
            messages.push(new UserEffectsListComposer().compose());
            client.sendResponses(messages);
        });
    }
}
