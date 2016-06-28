import fs = require('fs');
import ini = require('ini');
import Emulator from '../Emulator';
import Logging from './Logging';

export default class ConfigurationManager {
	public loaded: boolean = false;

	private path: string;
	private properties: Array<string>;

	public constructor(path: string) {
		this.path = path;
		this.reload();
	}

	public reload() {
		if(fs.existsSync(this.path)){
			this.properties = ini.parse(fs.readFileSync(this.path, 'UTF-8'));
		}else{
			Emulator.getLogging().logErrorLine('[CRITICAL] FAILED TO LOAD CONFIG.INI FILE!');
		}

		if(this.loaded){
			this.loadFromDatabase();
		}

		Emulator.getLogging().logStart('Configuration Manager -> Loaded!');
	}

	public loadFromDatabase(): void {
		Emulator.getDatabase().getPool().getConnection(function(err, connection){
			connection.query('SELECT * FROM emulator_settings', function(err, rows){
				for(let i = 0; i < rows.length; i++){
					Emulator.getConfig().putValue(rows[i].key, rows[i].value);
				}

				connection.release();
			});
		});
	}

	public putValue(key: string, value: Object): void {
		this.properties[key] = value.toString();
	}

	public getValue(key: string, defaultValue?: string): string {
		if(key in this.properties){
			return this.properties[key];
		}else{
			Emulator.getLogging().logErrorLine('[CONFIG] Key not found: ' + key);
			return (defaultValue ? defaultValue : '');
		}
	}

	public getBoolean(key: string, defaultValue?: boolean): boolean {
		let value: string = this.getValue(key);
		if(value !== ''){
			if(value.toLowerCase() === 'true' || value === '1'){
				return true;
			}else if(value.toLowerCase() === 'false' || value === '0'){
				return false;
			}else{
				return (defaultValue ? defaultValue : false);
			}
		}else{
			return (defaultValue ? defaultValue : false);
		}
	}

	public getInt(key: string, defaultValue?: number): number {
		let value: string = this.getValue(key);
		if(value !== ''){
			return parseInt(value);
		}else{
			return (defaultValue ? defaultValue : 0);
		}
	}
}