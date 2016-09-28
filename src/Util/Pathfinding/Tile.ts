export default class Tile {
    private x: number;
    private y: number;
    private z: number;

    public constructor(x?: number, y?: number, z?: number) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
        this.z = z ? z : 0.0;
    }

    public equals(tile: Tile): boolean {
        return this.x == tile.x && this.y == tile.y;
    }

    public copy(): Tile {
        return new Tile(this.x, this.y, this.z);
    }

    public toString(): string {
        return "X: " + this.x + ", Y:" + this.y + ", Z: " + this.z;
    }
}
