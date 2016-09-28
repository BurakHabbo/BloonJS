import RoomTileState from './RoomTileState';

export default class RoomLayout {
    private name: string;
    private doorX: number;
    private doorY: number;
    private doorZ: number;
    private doorDirection: number;
    private heightmap: string;
    private mapSize: number;
    private mapSizeX: number;
    private mapSizeY: number;
    private squareHeights: Array<Array<number>>;
    private squareStates: Array<Array<RoomTileState>>;
    private heighestPoint: number;

    public constructor(row) {
        this.name = row.name;
        this.doorX = <number>row.door_x;
        this.doorY = <number>row.door_y;
        this.doorDirection = <number>row.door_dir;
        this.heightmap = row.heightmap;

        this.parse();
    }

    public parse(): void {
        let modelTemp: Array<string> = this.heightmap.split("\r");

        this.mapSize = 0;
        this.mapSizeX = modelTemp[0].length;
        this.mapSizeY = modelTemp.length;
        this.squareHeights = new Array<Array<number>>();
        this.squareStates = new Array<Array<RoomTileState>>();

        for (let i = 0; i < this.mapSizeX; i++) {
            this.squareHeights[i] = new Array<number>();
            this.squareStates[i] = new Array<RoomTileState>();
        }

        let x: number;
        let Square: string;
        let height: number;

        for (let y: number = 0; y < this.mapSizeY; y++) {
            if (modelTemp[y].length == 0 || modelTemp[y] == "\r")
                continue;

            if (y > 0) {
                modelTemp[y] = modelTemp[y].substring(1);
            }

            for (x = 0; x < this.mapSizeX; x++) {
                if (modelTemp[y].length != this.mapSizeX)
                    break;

                Square = modelTemp[y].substring(x, x + 1).trim().toLowerCase();
                if (Square == "x") {
                    this.squareStates[x][y] = RoomTileState.BLOCKED;
                    this.mapSize += 1;
                } else {
                    if (Square.length == 0) {
                        height = 0;
                    } else if (!isNaN(parseFloat(Square))) {
                        height = parseInt(Square);
                    } else {
                        height = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(Square.toUpperCase());
                    }

                    this.squareStates[x][y] = RoomTileState.OPEN;
                    this.squareHeights[x][y] = height;
                    this.mapSize += 1;

                    if (this.heighestPoint < height) {
                        this.heighestPoint = height;
                    }
                }
            }
        }
    }

    public getHeightAtSquare(x: number, y: number): number {
        if (x < 0 || y < 0 || x >= this.getMapSizeX() || y >= this.getMapSizeY())
            return 0;

        return this.squareHeights[x][y];
    }

    public getName(): string {
        return this.name;
    }

    public getMapSize(): number {
        return this.mapSize;
    }

    public getMapSizeX(): number {
        return this.mapSizeX;
    }

    public getMapSizeY(): number {
        return this.mapSizeY;
    }

    public getDoorX(): number {
        return this.doorX;
    }

    public getDoorY(): number {
        return this.doorY;
    }

    public getDoorZ(): number {
        return this.doorZ;
    }

    public getDoorDirection(): number {
        return this.doorDirection;
    }

    public getSquareStates(): Array<Array<RoomTileState>> {
        return this.squareStates;
    }

    public getSquareHeights(): Array<Array<number>> {
        return this.squareHeights;
    }

    public getRelativeMap(): string {
        let heightmap: string = this.heightmap;

        for (let i = 0; i < 50; i++) {
            heightmap = heightmap.replace("\r\n", "\r");
        }

        return heightmap;
    }
}
