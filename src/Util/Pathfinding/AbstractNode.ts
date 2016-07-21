abstract class AbstractNode {
	protected static BASICMOVEMENTCOST: number = 10;
	protected static DIAGONALMOVEMENTCOST: number = 14;
	private xPosition: number;
	private yPosition: number;
	private walkable: boolean;
	private previous: AbstractNode;
	private diagonally: boolean;
	private movementPanelty: number;
	private gCosts: number;
	private hCosts: number;

	public constructor(xPosition: number, yPosition: number) {
		this.xPosition = xPosition;
		this.yPosition = yPosition;
		this.walkable = true;
		this.movementPanelty = 0;
	}

	public isDiagonaly(): boolean {
		return this.diagonally;
	}

	public setDiagonaly(isDiagonaly: boolean): void {
		this.diagonally = isDiagonaly;
	}

	public setCoordinates(x: number, y: number): void {
		this.xPosition = x;
		this.yPosition = y;
	}

	public getX(): number {
		return this.xPosition;
	}

	public getY(): number {
		return this.yPosition;
	}

	public isWalkable(): boolean {
		return this.walkable;
	}

	public setWalkable(walkable: boolean): void {
		this.walkable = walkable;
	}

	public getPrevious(): AbstractNode {
		return this.previous;
	}

	public setPrevious(previous: AbstractNode): void {
		this.previous = previous;
	}

	public setMovementPanelty(movementPanelty: number): void {
		this.movementPanelty = movementPanelty;
	}

	public getfCosts(): number {
		return this.gCosts + this.hCosts;
	}

	public getgCosts(): number {
		return this.gCosts;
	}

	public setgCosts(value1: number | AbstractNode, basicCost?: number): void {
		if(value1 instanceof AbstractNode && !basicCost){
			if(this.diagonally){
				this.setgCosts(value1, AbstractNode.DIAGONALMOVEMENTCOST);
			}else{
				this.setgCosts(value1, AbstractNode.BASICMOVEMENTCOST);
			}
		}else if(value1 instanceof AbstractNode && basicCost){
			this.setgCosts(value1.getgCosts() + basicCost);
		}else if(typeof value1 == "number" && !basicCost){
			this.gCosts = <number>value1 + this.movementPanelty;
		}
	}

	public calculategCosts(previousAbstractNode: AbstractNode, movementCost?: number): number {
		if(movementCost){
			return previousAbstractNode.getgCosts() + movementCost + this.movementPanelty;
		}else{
			if(this.diagonally){
				return previousAbstractNode.getgCosts() + AbstractNode.DIAGONALMOVEMENTCOST + this.movementPanelty;
			}else{
				return previousAbstractNode.getgCosts() + AbstractNode.BASICMOVEMENTCOST + this.movementPanelty;
			}
		}
	}

	public gethCosts(): number {
		return this.hCosts;
	}

	public sethCosts(hCosts: number): void {
		this.hCosts = hCosts;
	}

	public abstract sethCostsNode(paramAbstractNode: AbstractNode): void;

	public toString(): string {
		return "(" + this.getX() + ", " + this.getY() + "): h: " + this.gethCosts() + " g: " + this.getgCosts() + " f: " + this.getfCosts();
	}

	public equals(other: AbstractNode): boolean {
		return this.xPosition == other.xPosition && this.yPosition == other.yPosition;
	}
}

export default AbstractNode;