import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import UniqueMachineIDMessageComposer from '../../Outgoing/Handshake/UniqueMachineIDMessageComposer';

export default class UniqueIDMessageEvent extends MessageHandler {
	public handle(): void {
		if(this.client.getHabbo() || this.client.getMachineId() || !this.client.isRC4initialized()){
			return this.client.permBan();
		}

		let machineId1: string = this.packet.readString();
		let machineId2: string = this.packet.readString();
		let machinePlatform: string = this.packet.readString();

		if(!machineId1 || !machineId2 || !machinePlatform){
			return this.client.permBan();
		}

		if(machineId1 != machineId2){
			return this.client.permBan();
		}

		if(machineId1.length == 33 && machineId1.substring(1).match("[a-fA-F0-9]{32}") != null){
			this.client.setMachineId(machineId1);
			this.client.setMachinePlatform(machinePlatform);
			this.client.sendResponse(new UniqueMachineIDMessageComposer(machineId1));
		}else{
			return this.client.permBan();
		}
	}
}