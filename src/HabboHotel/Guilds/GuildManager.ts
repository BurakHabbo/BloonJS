import Emulator from '../../Emulator';
import GuildPartType from './GuildPartType';
import GuildPart from './GuildPart';
import Guild from './Guild';

export default class GuildManager {
    private guildParts: Array<Array<GuildPart>>;
    private guilds: Array<Guild>;

    public constructor() {
        this.guildParts = new Array<Array<GuildPart>>();
        this.guilds = new Array<Guild>();

        this.loadGuildParts();
        Emulator.getLogging().logStart("Guild Manager -> Loaded!");
    }

    public loadGuildParts(): void {
        this.guildParts = new Array<Array<GuildPart>>();

        let values = GuildPartType.values();
        for (let i = 0; i < values.length; i++) {
            let type: GuildPartType = values[i];
            this.guildParts[type] = new Array<GuildPart>();
        }

        Emulator.getDatabase().getPool().getConnection(function(err, connection) {
            connection.query('SELECT * FROM guilds_elements', function(err, rows) {
                for (let i = 0; i < rows.length; i++) {
                    let row = rows[i];
                    Emulator.getGameEnvironment().getGuildManager().putGuildPart(GuildPartType.valueOf(row.type.toUpperCase()), <number>row.id, new GuildPart(row));
                }

                connection.release();
            });
        });
    }

    public putGuildPart(type: GuildPartType, id: number, part: GuildPart): void {
        this.guildParts[type][id] = part;
    }

    public getGuildParts(): Array<Array<GuildPart>> {
        return this.guildParts;
    }

    public getGuilds(): Array<Guild> {
        return this.guilds;
    }
}
