import Emulator from '../Emulator';

export default class Logging {
    public static ANSI_BRIGHT: string = "\u001B[1m";
    public static ANSI_ITALICS: string = "\u001B[3m";
    public static ANSI_UNDERLINE: string = "\u001B[4m";

    public static ANSI_RESET: string = "\u001B[0m";
    public static ANSI_BLACK: string = "\u001B[30m";
    public static ANSI_RED: string = "\u001B[31m";
    public static ANSI_GREEN: string = "\u001B[32m";
    public static ANSI_YELLOW: string = "\u001B[33m";
    public static ANSI_BLUE: string = "\u001B[34m";
    public static ANSI_PURPLE: string = "\u001B[35m";
    public static ANSI_CYAN: string = "\u001B[36m";
    public static ANSI_WHITE: string = "\u001B[37m";
    public static ANSI_033: string = String.fromCharCode(parseInt("033", 8));

    public logStart(line: Object): void {
        console.log("[" + Logging.ANSI_BRIGHT + Logging.ANSI_GREEN + "LOADING" + Logging.ANSI_RESET + "] " + line.toString());
    }

    public logErrorLine(line: Object): void {
        console.log(line.toString().replace("[", "[" + Logging.ANSI_033 + "[1m" + Logging.ANSI_033 + "[31m").replace("]", Logging.ANSI_033 + "[0m]"));
    }

    public logPacketLine(line: Object): void {
        if (Emulator.debugging) {
            console.log("[" + Logging.ANSI_BLUE + "PACKET" + Logging.ANSI_RESET + "]" + line.toString());
        }
    }
}
