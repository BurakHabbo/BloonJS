import AbstractNode from './AbstractNode';

export default class Node extends AbstractNode {
    public constructor(xPosition: number, yPosition: number) {
        super(xPosition, yPosition);
    }

    public sethCostsNode(endNode: AbstractNode): void {
        this.sethCosts((Math.abs(this.getX() - endNode.getX()) + Math.abs(this.getY() - endNode.getY())) * 10);
    }

    public equals(node: Node): boolean {
        return this.getX() == node.getX() && this.getY() == node.getY();
    }
}
