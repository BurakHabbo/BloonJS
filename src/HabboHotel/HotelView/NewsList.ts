import NewsWidget from './NewsWidget';
import Emulator from '../../Emulator';

export default class NewsList {
    private newsWidgets: Array<NewsWidget>;

    public constructor() {
        this.reload();
    }

    public reload(): void {
        this.newsWidgets = [];
        Emulator.getDatabase().getPool().getConnection(function(err, connection) {
            connection.query('SELECT * FROM hotelview_news ORDER BY id DESC LIMIT 10', function(err, rows) {
                for (let i = 0; i < rows.length; i++) {
                    let row = rows[i];
                    Emulator.getGameEnvironment().getHotelViewManager().getNewsList().putNewsWidget(row);
                }
                connection.release();
            });
        });
    }

    public putNewsWidget(row) {
        this.newsWidgets.push(new NewsWidget(row));
    }

    public getNewsWidgets(): Array<NewsWidget> {
        return this.newsWidgets;
    }
}
