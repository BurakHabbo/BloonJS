import AbstractNode from './AbstractNode';
import Node from './Node';
import * as Collections from 'typescript-collections';
import Room from '../../HabboHotel/Rooms/Room';
import Pathfinding = require('pathfinding');

export default class GameMap<T extends AbstractNode> {
    private CANMOVEDIAGONALY: boolean = true;
    private nodes: Array<Array<number>>;
    private grid: Pathfinding.Grid;
    private width: number;
    private height: number;

    public constructor(width: number, height: number) {
        this.nodes = new Array<Array<number>>();
        this.width = width - 1;
        this.height = height - 1;
        this.initEmptyNodes();
    }

    private initEmptyNodes(): void {
        for (let i = 0; i <= this.width; i++) {
            this.nodes[i] = new Array<number>();
            for (let j = 0; j <= this.height; j++) {
                this.nodes[i][j] = 0;
            }
        }

        this.grid = new Pathfinding.Grid(this.nodes);
    }

    public setWalkable(x: number, y: number, bool: boolean) {
        if (x > this.nodes.length - 1)
            return;

        if (y > this.nodes[x].length - 1)
            return;

        this.nodes[x][y] = bool ? 0 : 1;
    }

    public getNode(x: number, y: number): number {
        return this.nodes[x][y];
    }

    public getGrid(): Pathfinding.Grid {
        return this.grid;
    }

    public setGrid(grid: Pathfinding.Grid): void {
        this.grid = grid;
    }
}
