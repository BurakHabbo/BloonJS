/// <reference path="refs/node.d.ts" />
/// <reference path="refs/ini.d.ts" />
/// <reference path="refs/mysql.d.ts" />
/// <reference path="refs/jsbn.d.ts" />
/// <reference path="refs/pathfinding.d.ts" />
//process.env.UV_THREADPOOL_SIZE=64;
import Logging from './Core/Logging';
import Random from './Util/Random';
import ConfigurationManager from './Core/ConfigurationManager';
import TextsManager from './Core/TextsManager';
import Database from './Database/Database';
import CleanerThread from './Core/CleanerThread';
import ThreadPooling from './Threading/ThreadPooling';
import GameServer from './Networking/GameServer/GameServer';
import GameEnvironment from './HabboHotel/GameEnvironment';

export default class Emulator {
	/**
	 * Major version of the emulator.
	 */
    public static MAJOR: number = 1;

	/**
	 * Minor version of the emulator.
	 */
    public static MINOR: number = 0;

	/**
	 * Stable build version of the emulator.
	 */
    public static BUILD: number = 8;

	/**
	 * Version as string.
	 */
    public static version: string = "Version: " + Emulator.MAJOR + "." + Emulator.MINOR + "." + Emulator.BUILD;

	/**
	 * SWF infos to secure packets.
	 */
    //public static swfBuild: string = "PRODUCTION-201609131202-736758364";//Work in progress
    public static swfBuild: string = "PRODUCTION-201601012205-226667486";
    public static flashBase: string = "http://127.0.0.1/resources/swf/gordon/PRODUCTION-201601012205-226667486/";
    public static externalVars: string = "http://127.0.0.1/resources/swf/gamedata/external_variables.txt";

	/**
	 * The emulator is fully loaded and ready to handle players.
	 */
    public static isReady: boolean = false;

	/**
	 * The emulator is shutting down.
	 */
    public static isShuttingDown: boolean = false;

	/**
	 * The emulator has fully shutdown.
	 */
    public static stopped: boolean = false;

	/**
	 * The emulator is in debugging mode.
	 */
    public static debugging: boolean = true;

    private static timeStarted: number = 0;
    private static config: ConfigurationManager;
    private static texts: TextsManager;
    private static gameServer: GameServer;
    //TODO: RCONServer, CameraClient
    private static database: Database;
    private static logging: Logging;
    private static threading: ThreadPooling;
    private static gameEnvironment: GameEnvironment;
    //TODO: PluginManager
    private static random: Random;
    //TODO: BadgeImager

	/**
	 * Entry point for BloonJS Emulator.
	 * @throws Exception Failed to start the emulator.
	 */
    public static main(): void {
        try {
            let startTime: number = Emulator.getCurrentTimeMillis();

            Emulator.stopped = false;
            Emulator.logging = new Logging();
            Emulator.logging.logStart("\r" + Emulator.logo);
            Emulator.random = new Random();
            Emulator.threading = new ThreadPooling();
            Emulator.config = new ConfigurationManager('../config.ini');
            Emulator.database = new Database(Emulator.getConfig());
            Emulator.config.loaded = true;
            Emulator.config.loadFromDatabase();
            //TODO: PluginManager
            Emulator.texts = new TextsManager();
            new CleanerThread();
            Emulator.gameServer = new GameServer(Emulator.getConfig().getValue('game.host', '127.0.0.1'), Emulator.getConfig().getInt('game.port', 30000));
            //TODO: RCONServer
            Emulator.gameEnvironment = new GameEnvironment();
            Emulator.gameEnvironment.load();
            Emulator.gameServer.initialise();
            Emulator.gameServer.connect();
            //TODO: BadgeImager, CameraClient
            Emulator.getLogging().logStart('Habbo Hotel Emulator has succesfully loaded.');
            Emulator.getLogging().logStart("You're running: " + Emulator.version);
            Emulator.getLogging().logStart("System launched in: " + (Emulator.getCurrentTimeMillis() - startTime) + "ms!");

            Emulator.debugging = true;//Emulator.getConfig().getBoolean("debug.mode");

            if (Emulator.debugging) {
                //Emulator.getLogging().logDebugLine("Debugging Enabled!");
            }

            //Emulator.getPluginManager().fireEvent(new EmulatorLoadedEvent());
            Emulator.isReady = true;
            Emulator.timeStarted = Emulator.getIntUnixTimestamp();
        } catch (e) {
            console.error(e);
        }
    }

    private static dispose(): void {
        Emulator.isShuttingDown = true;
        Emulator.isReady = false;
        //Emulator.getLogging().logShutdownLine("Stopping BloonJS Emulator " + Emulator.version + "...");

        //if (Emulator.getPluginManager() != null)
        //	Emulator.getPluginManager().fireEvent(new EmulatorStartShutdownEvent());

        //if (Emulator.cameraClient != null)
        //	Emulator.cameraClient.disconnect();

        //if (Emulator.gameEnvironment != null)
        //	Emulator.gameEnvironment.dispose();

        //if (Emulator.rconServer != null)
        //	Emulator.rconServer.stop();

        //if (Emulator.gameServer != null)
        //	Emulator.gameServer.stop();

        //if (Emulator.threading != null)
        //	Emulator.threading.shutDown();

        //if (Emulator.getPluginManager() != null)
        //	Emulator.getPluginManager().fireEvent(new EmulatorStoppedEvent());

        //if (Emulator.pluginManager != null)
        //	Emulator.pluginManager.dispose();


        //Emulator.getLogging().logShutdownLine("Stopped BloonJS Emulator " + Emulator.version + "...");
        Emulator.stopped = true;
    }

	/**
	 * @return The ConfigurationManager
	 */
    public static getConfig(): ConfigurationManager {
        return this.config;
    }

	/**
	 * @return The TextsManager
	 */
    public static getTexts(): TextsManager {
        return this.texts;
    }

	/**
	 * @return The Database
	 */
    public static getDatabase(): Database {
        return this.database;
    }

	/**
	 * @return The GameServer
	 */
    public static getGameServer(): GameServer {
        return this.gameServer;
    }

	/**
	 * @return Logging module
	 */
    public static getLogging(): Logging {
        return this.logging;
    }

	/**
	 * @return The ThreadPooling
	 */
    public static getThreading(): ThreadPooling {
        return this.threading;
    }

	/**
	 * @return The GameEnvironment
	 */
    public static getGameEnvironment(): GameEnvironment {
        return this.gameEnvironment;
    }

    //TODO: PluginManager, BadgeImager, Camera

    public static getTimeStarted(): number {
        return Emulator.timeStarted;
    }

    public static prepareShutdown(): void {
        process.exit(0);
    }

	/**
	 * Converts a date to an unix timestamp
	 * @param date The date to convert
	 * @return Return unix timestamp in seconds.
	 */
    public static dateToUnixTimestamp(date: Date): string {
        return Math.floor(date.getTime() / 1000 | 0).toString();
    }

	/**
	 * Converts a String to a Date object
	 * @param date The String to parse
	 * @return The Date of the string.
	 */
    public static stringToDate(date: string): Date {
        let res: Date = null;

        try {
            res = new Date(date);
        } catch (e) {
            Emulator.getLogging().logErrorLine(e);
        }

        return res;
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

    public static getCurrentTimeMillis(): number {
        return Date.now();
    }

    public static isNumeric(n: string): boolean {
        return !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
    }

    public static validString(s: string): boolean {
        return s.match("[^a-zA-Z0-9]") == null ? true : false;
    }

    public static getUserCount(): number {
        return Emulator.getGameEnvironment().getHabboManager().getOnlineCount();
    }

    public static getRoomCount(): number {
        return 0;
    }

    public static logo: string =
    " _______   __                                   _____   ______   __ \n" +
    "/       \\ /  |                                 /     | /      \\ /  |\n" +
    "$$$$$$$  |$$ |  ______    ______   _______     $$$$$ |/$$$$$$  |$$ |\n" +
    "$$ |__$$ |$$ | /      \\  /      \\ /       \\       $$ |$$ \\__$$/ $$ |\n" +
    "$$    $$< $$ |/$$$$$$  |/$$$$$$  |$$$$$$$  | __   $$ |$$      \\ $$ |\n" +
    "$$$$$$$  |$$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |/  |  $$ | $$$$$$  |$$/ \n" +
    "$$ |__$$ |$$ |$$ \\__$$ |$$ \\__$$ |$$ |  $$ |$$ \\__$$ |/  \\__$$ | __ \n" +
    "$$    $$/ $$ |$$    $$/ $$    $$/ $$ |  $$ |$$    $$/ $$    $$/ /  |\n" +
    "$$$$$$$/  $$/  $$$$$$/   $$$$$$/  $$/   $$/  $$$$$$/   $$$$$$/  $$/ \n";
}

Emulator.main();
