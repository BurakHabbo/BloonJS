/// <reference path="refs/node.d.ts" />
/// <reference path="refs/ini.d.ts" />
/// <reference path="refs/mysql.d.ts" />
//process.env.UV_THREADPOOL_SIZE=64;
import Logging from './Core/Logging';
import Random from './Util/Random';
import ConfigurationManager from './Core/ConfigurationManager';
import TextsManager from './Core/TextsManager';
import Database from './Database/Database';
import CleanerThread from './Core/CleanerThread';
import ThreadPooling from './Threading/ThreadPooling';

export default class Emulator {
	public static logo: string = "\r######                              ######  #     # ######   ###\n#     # #       ####   ####  #    # #     # #     # #     #  ###\n#     # #      #    # #    # ##   # #     # #     # #     #  ###\n######  #      #    # #    # # #  # ######  ####### ######    # \n#     # #      #    # #    # #  # # #       #     # #           \n#     # #      #    # #    # #   ## #       #     # #        ###\n######  ######  ####   ####  #    # #       #     # #        ###";
	public static version: string = 'Version: 0.0.1';
	public static isReady: boolean = false;
	public static stopped: boolean = false;
	public static debugging: boolean = true;

	private static threading: ThreadPooling;
	private static config: ConfigurationManager;
	private static texts: TextsManager;
	private static database: Database;
	private static logging: Logging;
	private static random: Random;

	public static main(): void {
		Emulator.stopped = false;
		Emulator.logging = new Logging();
		Emulator.logging.logStart(Emulator.logo);
		Emulator.random = new Random();
		Emulator.threading = new ThreadPooling();
		Emulator.config = new ConfigurationManager('../config.ini');
		Emulator.database = new Database(Emulator.getConfig());
		Emulator.config.loaded = true;
		Emulator.config.loadFromDatabase();
		Emulator.texts = new TextsManager();
		new CleanerThread();
	}

	public static getLogging(): Logging {
		return this.logging;
	}

	public static getConfig(): ConfigurationManager {
		return this.config;
	}

	public static getDatabase(): Database {
		return this.database;
	}

	public static getTexts(): TextsManager {
		return this.texts;
	}

	public static getThreading(): ThreadPooling {
		return this.threading;
	}

	public static dateToTimeStamp(date: Date): number {
		return date.getTime();
	}

	public static getDate(): Date {
		return new Date();
	}

	public static getUnixTimestamp(): string {
		return Emulator.getIntUnixTimestamp().toString();
	}

	public static getIntUnixTimestamp(): number {
		return Date.now() / 1000 | 0;
	}
}

Emulator.main();