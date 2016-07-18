import Emulator from '../../Emulator';
import Habbo from '../Users/Habbo';

export default class PermissionsManager {
	private permissions: Array<Array<string>>;
	private rankNames: Array<string>;
	private enables: Array<number>;

	public constructor() {
		this.permissions = new Array<Array<string>>();
		this.rankNames = new Array<string>();
		this.enables = new Array<number>();

		this.reload();

		Emulator.getLogging().logStart("Permissions Manager -> Loaded!");
	}

	public reload(): void {
		this.loadPermissions();
        this.loadEnables();
	}

	public loadPermissions(): void {
		this.permissions = new Array<Array<string>>();

		Emulator.getDatabase().getPool().getConnection(function(err, connection){
			connection.query('SELECT * FROM permissions ORDER BY id ASC', function(err, rows){
				for(let i = 0; i < rows.length; i++){
					let names: Array<string> = new Array<string>();
					let row = rows[i];
					let meta = Object.keys(row);

					for(let j = 0; j < meta.length; j++){
						if(meta[j].lastIndexOf("cmd_", 0) === 0 || meta[j].lastIndexOf("acc_", 0) === 0){
							if(row[meta[j]] == "1"){
								names.push(meta[j]);
							}
						}

						if(meta[j] == "rank_name"){
							Emulator.getGameEnvironment().getPermissionsManager().putRankName(<number>row.id, row[meta[j]]);
						}
					}

					Emulator.getGameEnvironment().getPermissionsManager().putPermissions(<number>row.id, names);
				}
				connection.release();
			});
		});
	}

	public putRankName(id: number, rankName: string): void {
		this.rankNames[id] = rankName;
	}

	public putPermissions(id: number, permissions: Array<string>): void {
		this.permissions[id] = permissions;
	}

	public loadEnables(): void {
		this.enables = new Array<number>();

		Emulator.getDatabase().getPool().getConnection(function(err, connection){
			connection.query('SELECT * FROM special_enables', function(err, rows){
				for(let i = 0; i < rows.length; i++){
					let row = rows[i];
					Emulator.getGameEnvironment().getPermissionsManager().putEnable(<number>row.effect_id, <number>row.min_rank);
				}
				connection.release();
			});
		});
	}

	public putEnable(effectId: number, minRank: number): void {
		this.enables[effectId] = minRank;
	}

	public hasPermission(value: Habbo | number, permission: string): boolean {
		if(value instanceof Habbo){
			return this.hasPermission(value.getHabboInfo().getRank(), permission);
		}else if(typeof value == "number"){
			return value in this.permissions && this.permissions[value].indexOf(permission) > -1;
		}
	}
}