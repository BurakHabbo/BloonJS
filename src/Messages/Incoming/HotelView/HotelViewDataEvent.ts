import MessageHandler from '../MessageHandler';
import Emulator from '../../../Emulator';
import HotelViewDataComposer from '../../Outgoing/HotelView/HotelViewDataComposer';

export default class HotelViewDataEvent extends MessageHandler {
    public handle(): void {
        let data: string = this.packet.readString();

        if (data.indexOf(";") > -1) {
            let d: string[] = data.split(";");

            for (let i = 0; i < d.length; i++) {
                let s: string = d[i];

                if (s.indexOf(",") > -1) {
                    this.client.sendResponse(new HotelViewDataComposer(s, s.split(",")[s.split(",").length - 1]));
                } else {
                    this.client.sendResponse(new HotelViewDataComposer(data, s));
                }

                break;
            }
        } else {
            this.client.sendResponse(new HotelViewDataComposer(data, data.split(",")[data.split(",").length - 1]));
        }
    }
}
