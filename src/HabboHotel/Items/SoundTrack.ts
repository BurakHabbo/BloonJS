export default class SoundTrack {
	private id: number;
	private name: string;
	private author: string;
	private code: string;
	private data: string;
	private length: number;

	public constructor(row) {
		this.id = <number>row.id;
		this.name = row.name;
		this.author = row.author;
		this.code = row.code;
		this.data = row.track;
		this.length = <number>row.length;
	}
}