export default class FriendRequest {
	private id: number;
	private username: string;
	private look: string;

	public constructor(row) {
		this.id = <number>row.id;
		this.username = row.username;
		this.look = row.look;
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
}