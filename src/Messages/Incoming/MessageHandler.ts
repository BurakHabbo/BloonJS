import GameClient from '../../HabboHotel/GameClients/GameClient';
import ClientMessage from '../ClientMessage';

abstract class MessageHandler {
	public client: GameClient;
	public packet: ClientMessage;

	public abstract handle(): void;
}

export default MessageHandler;