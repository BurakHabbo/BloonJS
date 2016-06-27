/// <reference path="node.d.ts" />
import fs = require('fs');

export default class Emulator {
	public static logo : string = "\r######                              ######  #     # ######   ###\n#     # #       ####   ####  #    # #     # #     # #     #  ###\n#     # #      #    # #    # ##   # #     # #     # #     #  ###\n######  #      #    # #    # # #  # ######  ####### ######    # \n#     # #      #    # #    # #  # # #       #     # #           \n#     # #      #    # #    # #   ## #       #     # #        ###\n######  ######  ####   ####  #    # #       #     # #        ###";
	public static version : string = "Version: 0.0.1";
	public static isReady : boolean = false;
	public static stopped : boolean = false;
	public static debugging : boolean = true;

	private static config : ConfigurationManager;
	private static logging : Logging;
	private static random : Random;

	static main(): void {
		Emulator.stopped = false;
		this.logging = new Logging();
		this.logging.logStart(Emulator.logo);
		this.random = new Random();
		this.config = new ConfigurationManager("config.ini");
	}
}

export class Logging {
	public static ANSI_BRIGHT : string = "\u001B[1m";
	public static ANSI_ITALICS : string = "\u001B[3m";
    public static ANSI_UNDERLINE : string = "\u001B[4m";

    public static ANSI_RESET : string = "\u001B[0m";
    public static ANSI_BLACK : string = "\u001B[30m";
    public static ANSI_RED : string = "\u001B[31m";
    public static ANSI_GREEN : string = "\u001B[32m";
    public static ANSI_YELLOW : string = "\u001B[33m";
    public static ANSI_BLUE : string = "\u001B[34m";
    public static ANSI_PURPLE : string = "\u001B[35m";
    public static ANSI_CYAN : string = "\u001B[36m";
    public static ANSI_WHITE : string = "\u001B[37m";

	public logStart(line : Object) : void {
		console.log("[" + Logging.ANSI_BRIGHT + Logging.ANSI_GREEN + "LOADING" + Logging.ANSI_RESET + "] " + line.toString());
	}

}

export class Random {

}

export class ConfigurationManager {
	public static loaded : boolean = false;

	private path : string;
	private properties : Array<string>;

	public constructor(path : string) {
		this.path = path;
		this.reload();
	}

	public reload() {
		console.log();
	}
}

new Emulator.main();

/*
*/