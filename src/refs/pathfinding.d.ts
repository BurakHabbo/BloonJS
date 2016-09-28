declare module "pathfinding" {
    export class Grid {
        public constructor(matrix: Array<Array<number>>);
        public clone(): Grid;
    }

    export class AStarFinder {
        public constructor({});
        public findPath(oldX: number, oldY: number, newX: number, newY: number, matrix: Grid): Array<Array<number>>;
    }
}
