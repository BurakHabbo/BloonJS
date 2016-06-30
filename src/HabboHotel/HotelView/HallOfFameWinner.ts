export default class HallOfFameWinner {
	private id: number;
	private username: string;
	private look: string;
	private points: number;

	public constructor(row) {
		this.id = <number>row.id;
		this.username = row.username;
		this.look = row.look;
		this.points = <number>row.hof_points;
	}

	public getId(): number {
		return this.id;
	}

	public getUsername(): string {
		return this.username;
	}

	public getLook(): string {
		return this.look;
	}

	public getPoints(): number {
		return this.points;
	}
}