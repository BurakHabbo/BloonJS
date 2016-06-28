import Emulator from '../Emulator';

export default class TextsManager {
	private texts: Array<string> = [];

	public constructor() {
		this.reload();

		Emulator.getLogging().logStart('Texts Manager -> Loaded!');
	}

	public reload(): void {
		Emulator.getDatabase().getPool().getConnection(function(err, connection){
			connection.query('SELECT * FROM emulator_texts', function(err, rows){
				for(let i = 0; i < rows.length; i++){
					Emulator.getTexts().putValue(rows[i].key, rows[i].value);
				}

				connection.release();
			});
		});
	}

	public putValue(key: string, value: Object): void {
		this.texts[key] = value.toString();
	}

	public getValue(key: string, defaultValue?: string): string {
		if(key in this.texts){
			return this.texts[key];
		}else{
			Emulator.getLogging().logErrorLine('[TEXTS] Text key not found: ' + key);
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