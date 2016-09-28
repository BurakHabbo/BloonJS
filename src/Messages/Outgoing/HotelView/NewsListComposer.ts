import MessageComposer from '../MessageComposer';
import ServerMessage from '../../ServerMessage';
import Outgoing from '../Outgoing';
import Habbo from '../../../HabboHotel/Users/Habbo';
import Emulator from '../../../Emulator';
import NewsList from '../../../HabboHotel/HotelView/NewsList';
import NewsWidget from '../../../HabboHotel/HotelView/NewsWidget';

export default class NewsListComposer extends MessageComposer {

    public constructor() {
        super();
    }
    public compose(): ServerMessage {
        this.response.init(Outgoing.NewsListComposer);
        let newsList: NewsList = Emulator.getGameEnvironment().getHotelViewManager().getNewsList();
        let widgets: Array<NewsWidget> = newsList.getNewsWidgets();

        this.response.appendInt(widgets.length);

        for (let i = 0; i < widgets.length; i++) {
            let widget: NewsWidget = widgets[i];
            this.response.appendInt(widget.getId());
            this.response.appendString(widget.getTitle());
            this.response.appendString(widget.getMessage());
            this.response.appendString(widget.getButtonMessage());
            this.response.appendInt(widget.getType());
            this.response.appendString("event:" + widget.getLink());
            this.response.appendString(widget.getImage());
        }
        return this.response;
    }
}
