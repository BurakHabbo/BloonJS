enum GuildPartType {
    BASE, SYMBOL, BASE_COLOR, SYMBOL_COLOR, BACKGROUND_COLOR
}

namespace GuildPartType {
    export function values(): Array<GuildPartType> {
        return new Array<GuildPartType>(GuildPartType.BASE, GuildPartType.SYMBOL, GuildPartType.BASE_COLOR, GuildPartType.SYMBOL_COLOR, GuildPartType.BACKGROUND_COLOR);
    }

    export function valueOf(type: string): GuildPartType {
        return GuildPartType[type] ? GuildPartType[type] : GuildPartType.BASE;
    }
}

export default GuildPartType;
