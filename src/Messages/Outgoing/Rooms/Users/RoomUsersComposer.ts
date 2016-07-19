import MessageComposer from '../../MessageComposer';
import ServerMessage from '../../../ServerMessage';
import Outgoing from '../../Outgoing';
import Habbo from '../../../../HabboHotel/Users/Habbo';
import HabboGender from '../../../../HabboHotel/Users/HabboGender';

export default class RoomUsersComposer extends MessageComposer {
	private habbo: Habbo;
	private habbos: Array<Habbo>;
	//private bot: Bot;
	//private bots: Array<Bot>;

	public constructor(value: Habbo | Array<Habbo>){
		super();
		if(value instanceof Habbo){
			this.habbo = value;
		}else{
			this.habbos = value;
		}
	}

	public compose(): ServerMessage {
		this.response.init(Outgoing.RoomUsersComposer);

		if(this.habbo != null){
			this.response.appendInt(1);
			this.response.appendInt(this.habbo.getHabboInfo().getId());
			this.response.appendString(this.habbo.getHabboInfo().getUsername());
			this.response.appendString(this.habbo.getHabboInfo().getMotto());
			this.response.appendString(this.habbo.getHabboInfo().getLook());
			this.response.appendInt(this.habbo.getRoomUnit().getId());
			this.response.appendInt(this.habbo.getRoomUnit().getX());
			this.response.appendInt(this.habbo.getRoomUnit().getY());
			this.response.appendString("0.0");//this.habbo.getRoomUnit().getZ()
			this.response.appendInt(this.habbo.getRoomUnit().getBodyRotation());
			this.response.appendInt(1);
			this.response.appendString(this.habbo.getHabboInfo().getGender() == HabboGender.M ? "M" : "F");
			this.response.appendInt(-1);
			this.response.appendInt(-1);
			this.response.appendString("");

			this.response.appendString("");
			this.response.appendInt(666);
			this.response.appendBoolean(true);
		}else if(this.habbos != null){
			let keys = Object.keys(this.habbos);
			this.response.appendInt(keys.length);

			for(let i = 0; i < keys.length; i++){
				let habbo: Habbo = this.habbos[keys[i]];

				this.response.appendInt(habbo.getHabboInfo().getId());
				this.response.appendString(habbo.getHabboInfo().getUsername());
				this.response.appendString(habbo.getHabboInfo().getMotto());
				this.response.appendString(habbo.getHabboInfo().getLook());
				this.response.appendInt(habbo.getRoomUnit().getId());
				this.response.appendInt(habbo.getRoomUnit().getX());
				this.response.appendInt(habbo.getRoomUnit().getY());
				this.response.appendString("0.0");//this.habbo.getRoomUnit().getZ()
				this.response.appendInt(habbo.getRoomUnit().getBodyRotation());
				this.response.appendInt(1);
				this.response.appendString(habbo.getHabboInfo().getGender() == HabboGender.M ? "M" : "F");
				this.response.appendInt(-1);
				this.response.appendInt(-1);
				this.response.appendString("");

				this.response.appendString("");
				this.response.appendInt(666);
				this.response.appendBoolean(true);
			}
		}else{
			this.response.appendInt(0);
		}
		return this.response;
	}
}