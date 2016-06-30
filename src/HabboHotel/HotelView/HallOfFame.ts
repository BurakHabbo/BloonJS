import HallOfFameWinner from './HallOfFameWinner';
import Emulator from '../../Emulator';

export default class HallOfFame {
	private winners: Array<HallOfFameWinner>;
	private competitionName: string;

	public constructor() {
		this.setCompetitionName('xmasRoomComp');
		this.reload();
	}

	public reload(): void {
		this.winners = [];

		Emulator.getDatabase().getPool().getConnection(function(err, connection){
			connection.query('SELECT users.look, users.username, users.id, users_settings.hof_points FROM users_settings INNER JOIN users ON users_settings.user_id = users.id WHERE hof_points > 0 ORDER BY hof_points DESC, users.id ASC LIMIT 10', function(err, rows){
				for(let i = 0; i < rows.length; i++){
					let row = rows[i];
					Emulator.getGameEnvironment().getHotelViewManager().getHallOfFame().putWinner(<number>row.id, row);
				}
				connection.release();
			});
		});
	}

	public putWinner(id: number, row) : void {
		this.winners[id] = new HallOfFameWinner(row);
	}

	public getWinners(): Array<HallOfFameWinner> {
		return this.winners;
	}

	public getCompetitionName(): string {
		return this.competitionName;
	}

	public setCompetitionName(name: string): void {
		this.competitionName = name;
	}
}