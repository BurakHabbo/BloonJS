export default class NewsWidget {
    private id: number;
    private title: string;
    private message: string;
    private buttonMessage: string;
    private type: number;
    private link: string;
    private image: string;

    public constructor(row) {
        this.id = <number>row.id;
        this.title = row.title;
        this.message = row.text;
        this.buttonMessage = row.button_text;
        this.type = row.button_type === 'client' ? 1 : 0;
        this.link = row.button_link;
        this.image = row.image;
    }

    public getId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getMessage(): string {
        return this.message;
    }

    public getButtonMessage(): string {
        return this.buttonMessage;
    }

    public getType(): number {
        return this.type;
    }

    public getLink(): string {
        return this.link;
    }

    public getImage(): string {
        return this.image;
    }
}
