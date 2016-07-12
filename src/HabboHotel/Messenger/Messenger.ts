import MessengerBuddy from './MessengerBuddy';
import FriendRequest from './FriendRequest';
import Habbo from '../Users/Habbo';
import Emulator from '../../Emulator';
import FriendsComposer from '../../Messages/Outgoing/Friends/FriendsComposer';

export default class Messenger {
	private friends: Array<MessengerBuddy>;
	private friendRequests: Array<FriendRequest>;

	public constructor() {
		this.friends = new Array<MessengerBuddy>();
		this.friendRequests = new Array<FriendRequest>();
	}

	public loadFriends(habbo: Habbo): void {
		Emulator.getDatabase().getPool().getConnection(function(err, connection){
			connection.query('SELECT users.id, users.username, users.gender, users.online, users.look, users.motto, messenger_friendships.* FROM messenger_friendships INNER JOIN users ON messenger_friendships.user_two_id = users.id WHERE user_one_id = ?', [habbo.getHabboInfo().getId()], function(err, rows){
				for(let i = 0; i < rows.length; i++){
					let row = rows[i];
					habbo.getMessenger().putFriend(<number>row.id, new MessengerBuddy(row));
				}

				habbo.getClient().sendResponse(new FriendsComposer(habbo).compose());

				connection.release();
			});
		});
	}

	public putFriend(id: number, buddy: MessengerBuddy): void {
		this.friends[id] = buddy;
	}

	public loadFriendRequests(habbo: Habbo): void {
		Emulator.getDatabase().getPool().getConnection(function(err, connection){
			connection.query('SELECT users.id, users.username, users.look FROM messenger_friendrequests INNER JOIN users ON user_from_id = users.id WHERE user_to_id = ?', [habbo.getHabboInfo().getId()], function(err, rows){
				for(let i = 0; i < rows.length; i++){
					let row = rows[i];
					habbo.getMessenger().addFriendRequest(new FriendRequest(row));
				}

				connection.release();
			});
		});
	}

	public addFriendRequest(request: FriendRequest): void {
		this.friendRequests.push(request);
	}

	public getFriends(): Array<MessengerBuddy> {
		return this.friends;
	}

	public getFriendRequests(): Array<FriendRequest> {
		return this.friendRequests;
	}
}