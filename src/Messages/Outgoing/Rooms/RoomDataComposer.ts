import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Room from '../../../HabboHotel/Rooms/Room';
import Habbo from '../../../HabboHotel/Users/Habbo';

export default class RoomDataComposer extends MessageComposer {
	private room: Room;
	private habbo: Habbo;
	private publicRoom: boolean;
	private unknown: boolean;

	public constructor(room: Room, habbo: Habbo, boolA: boolean, boolB: boolean){
		super();
		this.room = room;
		this.habbo = habbo;
		this.publicRoom = boolA;
		this.unknown = boolB;
	}
	public compose(): ServerMessage {
		this.response.init(Outgoing.RoomDataComposer);
		this.response.appendBoolean(this.unknown);
		this.response.appendInt(this.room.getId());
		this.response.appendString(this.room.getName());

		if(this.room.isPublicRoom()){
			this.response.appendInt(0);
			this.response.appendString("");
		}else{
			this.response.appendInt(this.room.getOwnerId());
			this.response.appendString(this.room.getOwnerName());
		}

		this.response.appendInt(<number>this.room.getState());
		this.response.appendInt(this.room.getUsersCount());
		this.response.appendInt(this.room.getUsersMax());
		this.response.appendString(this.room.getDescription());
		this.response.appendInt(0);
		this.response.appendInt(2);
		this.response.appendInt(this.room.getScore());
		this.response.appendInt(this.room.getCategory());

		if(this.room.getTags() == ""){
			this.response.appendInt(0);
		}else{
			let tags: string[] = this.room.getTags().split(";");


			this.response.appendInt(tags.length);

			for(let i = 0; i < tags.length; i++){
				this.response.appendString(tags[i]);
			}
		}

		let base: number = 8 | 16;

		if(this.room.getGuildId() > 0){
			//base = base | 2;
		}

		if(this.room.isPublicRoom()){
			base = base | 8;
		}

		if(this.room.isPromoted()){
			base = base | 4;
		}

		this.response.appendInt(base);

		if(this.room.getGuildId() > 0){

		}

		if(this.room.isPromoted()){

		}

		this.response.appendBoolean(this.publicRoom);
		this.response.appendBoolean(this.room.isStaffPromotedRoom());
		this.response.appendBoolean(this.room.isPublicRoom());
		this.response.appendBoolean(this.room.isMuted());

		this.response.appendInt(this.room.getMuteOption());
		this.response.appendInt(this.room.getKickOption());
		this.response.appendInt(this.room.getBanOption());

		this.response.appendBoolean(this.room.hasRights(this.habbo));

		this.response.appendInt(this.room.getChatMode());
		this.response.appendInt(this.room.getChatWeight());
		this.response.appendInt(this.room.getChatSpeed());
		this.response.appendInt(this.room.getChatDistance());
		this.response.appendInt(this.room.getChatProtection());

		return this.response;
	}
}