import ThreadPooling from '../Threading/ThreadPooling';
import Runnable from '../Threading/Runnable';
import Emulator from '../Emulator';

export default class CleanerThread extends Runnable {
	public static DELAY: number = 10000;
	public static RELOAD_HALL_OF_FAME: number = 1800;
	public static RELOAD_NEWS_LIST: number = 3600;
	public static REMOVE_INACTIVE_ROOMS: number = 120;
	public static REMOVE_INACTIVE_GUILDS: number = 60;
	public static REMOVE_INACTIVE_TOURS: number = 600;
	public static SAVE_ERROR_LOGS: number = 30;
	public static CALLBACK_TIME: number = 60 * 15;
	public static LAST_HOF_RELOAD: number;
	public static LAST_NL_RELOAD: number;
	public static LAST_INACTIVE_ROOMS_CLEARED: number;
	public static LAST_INACTIVE_GUILDS_CLEARED: number;
	public static LAST_INACTIVE_TOURS_CLEARED: number;
	public static LAST_ERROR_LOGS_SAVED: number;
	public static LAST_CALLBACK: number;

	public constructor() {
		super();
		this.databaseCleanup();
		CleanerThread.LAST_HOF_RELOAD = Emulator.getIntUnixTimestamp();
		CleanerThread.LAST_NL_RELOAD = Emulator.getIntUnixTimestamp();
		CleanerThread.LAST_INACTIVE_ROOMS_CLEARED = Emulator.getIntUnixTimestamp();
		CleanerThread.LAST_INACTIVE_GUILDS_CLEARED = Emulator.getIntUnixTimestamp();
		CleanerThread.LAST_INACTIVE_TOURS_CLEARED = Emulator.getIntUnixTimestamp();
		CleanerThread.LAST_ERROR_LOGS_SAVED = Emulator.getIntUnixTimestamp();
		CleanerThread.LAST_CALLBACK = Emulator.getIntUnixTimestamp();
		Emulator.getThreading().schedule(this, CleanerThread.DELAY);
	}

	public run(): void {
		console.log('Scheduled');
	}

	public databaseCleanup(): void {
		Emulator.getDatabase().getPool().getConnection(function(err, connection){
			connection.query('UPDATE users SET online = ?', ['0'], function(err, rows){
				connection.release();
			});
		});

		Emulator.getLogging().logStart('Database -> Cleaned!');
	}
}