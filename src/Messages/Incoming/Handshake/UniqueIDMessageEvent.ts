import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import UniqueMachineIDMessageComposer from '../../Outgoing/Handshake/UniqueMachineIDMessageComposer';

export default class UniqueIDMessageEvent extends MessageHandler {
	public handle(): void {
		this.packet.readString();
		this.client.setMachineId(this.packet.readString());
		this.client.setMachinePlatform(this.packet.readString());

		if(this.client.getMachineId().length == 33 && this.client.getMachineId().substring(1).match("[a-fA-F0-9]{32}") != null){
			this.client.sendResponse(new UniqueMachineIDMessageComposer(this.client.getMachineId()));
		}else{
			this.client.destroy();
		}
	}
}