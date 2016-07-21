import AbstractNode from './AbstractNode';
import Node from './Node';
import * as Collections from 'typescript-collections';
import Room from '../../HabboHotel/Rooms/Room';

export default class GameMap<T extends AbstractNode> {
	private static CANMOVEDIAGONALY: boolean = true;
	private nodes: Array<Array<AbstractNode>>;
	private width: number;
	private height: number;
	private openList: Collections.LinkedList<AbstractNode>;
	private closedList: Collections.LinkedList<AbstractNode>;
	private done: boolean = false;

	public constructor(width: number, height: number) {
		this.nodes = new Array<Array<AbstractNode>>();
		this.width = width - 1;
		this.height = height - 1;
		this.initEmptyNodes();
	}

	private initEmptyNodes(): void {
		for(let i = 0; i <= this.width; i++){
			this.nodes[i] = new Array<AbstractNode>();
			for(let j = 0; j <= this.height; j++){
				this.nodes[i][j] = new Node(i, j);
			}
		}
	}

	public setWalkable(x: number, y: number, bool: boolean){
		if(x > this.nodes.length - 1)
			return;

		if(y > this.nodes[x].length - 1)
			return;

		this.nodes[x][y].setWalkable(bool);
	}

	public getNode(x: number, y: number): AbstractNode {
		return this.nodes[x][y];
	}

	public getNodes(): Array<AbstractNode> {
		let nodes: Array<AbstractNode> = new Array<AbstractNode>();
		for(let x = 0; x < this.nodes.length; x++){
			for(let y = 0; y < this.nodes[x].length; y++){
				nodes.push(this.getNode(x, y));
			}
		}

		return nodes;
	}

	private lowestFInOpen(): AbstractNode {
		if(this.openList == null)
			return null;

		let cheapest: AbstractNode = this.openList.first();

		this.openList.forEach(function(anOpenList: AbstractNode){
			if(anOpenList.getfCosts() < cheapest.getfCosts()){
				cheapest = anOpenList;
			}
		});

		return cheapest;
	}

	public calcPath(start: AbstractNode, goal: AbstractNode, room: Room): Collections.Queue<AbstractNode> {
		let path: Collections.Queue<AbstractNode> = new Collections.Queue<AbstractNode>();
		let pathReverse: Array<Node> = new Array<Node>();
		let curr: AbstractNode = goal;
		let done: boolean = false;

		while(!done){
			if(curr != null){
				//path.add(curr);
				pathReverse.push(curr);
				curr = this.getNode(curr.getPrevious().getX(), curr.getPrevious().getY());
				if((curr != null) && (start != null) && (curr.equals(start))){
					done = true;
				}
			}
		}

		pathReverse.reverse();
		
		for(let i = 0; i < pathReverse.length; i++){
			path.add(pathReverse[i]);
		}

		return path;
	}

	public getAdjacent(node: AbstractNode, newX: number, newY: number, room: Room): Collections.LinkedList<AbstractNode> {
		let x: number = node.getX();
		let y: number = node.getY();
		let adj: Collections.LinkedList<AbstractNode> = new Collections.LinkedList<AbstractNode>();

		if(x > 0){
			let temp: AbstractNode = this.getNode(x - 1, y);
			if(((temp.isWalkable()) && (!this.closedList.contains(temp))) || (temp.getX() == newX && temp.getY() == newY)){//(temp.getX() == newX && temp.getY() == newY && room.canSitOrLayAt(newX, newY))
				temp.setDiagonaly(false);
				adj.add(temp);
			}
		}

		if(x < this.width){
			let temp: AbstractNode = this.getNode(x + 1, y);
			if(((temp.isWalkable()) && (!this.closedList.contains(temp))) || (temp.getX() == newX && temp.getY() == newY)){//(temp.getX() == newX && temp.getY() == newY && room.canSitOrLayAt(newX, newY))
				temp.setDiagonaly(false);
				adj.add(temp);
			}
		}

		if(y > 0){
			let temp: AbstractNode = this.getNode(x, y - 1);
			if(((temp.isWalkable()) && (!this.closedList.contains(temp))) || (temp.getX() == newX && temp.getY() == newY)){//(temp.getX() == newX && temp.getY() == newY && room.canSitOrLayAt(newX, newY))
				temp.setDiagonaly(false);
				adj.add(temp);
			}
		}

		if(y < this.height){
			let temp: AbstractNode = this.getNode(x, y + 1);
			if(((temp.isWalkable()) && (!this.closedList.contains(temp))) || (temp.getX() == newX && temp.getY() == newY)){//(temp.getX() == newX && temp.getY() == newY && room.canSitOrLayAt(newX, newY))
				temp.setDiagonaly(false);
				adj.add(temp);
			}
		}

		if(GameMap.CANMOVEDIAGONALY){
			if((x < this.width) && (y < this.height)){
				let temp: AbstractNode = this.getNode(x + 1, y + 1);
				if(((temp.isWalkable()) && (!this.closedList.contains(temp))) || (temp.getX() == newX && temp.getY() == newY)){//(temp.getX() == newX && temp.getY() == newY && room.canSitOrLayAt(newX, newY))
					temp.setDiagonaly(true);
					adj.add(temp);
				}
			}

			if((x > 0) && (y > 0)){
				let temp: AbstractNode = this.getNode(x - 1, y - 1);
				if(((temp.isWalkable()) && (!this.closedList.contains(temp))) || (temp.getX() == newX && temp.getY() == newY)){//(temp.getX() == newX && temp.getY() == newY && room.canSitOrLayAt(newX, newY))
					temp.setDiagonaly(true);
					adj.add(temp);
				}
			}

			if((x > 0) && (y < this.height)){
				let temp: AbstractNode = this.getNode(x - 1, y + 1);
				if(((temp.isWalkable()) && (!this.closedList.contains(temp))) || (temp.getX() == newX && temp.getY() == newY)){//(temp.getX() == newX && temp.getY() == newY && room.canSitOrLayAt(newX, newY))
					temp.setDiagonaly(true);
					adj.add(temp);
				}
			}

			if((x < this.width) && (y > 0)){
				let temp: AbstractNode = this.getNode(x + 1, y - 1);
				if(((temp.isWalkable()) && (!this.closedList.contains(temp))) || (temp.getX() == newX && temp.getY() == newY)){//(temp.getX() == newX && temp.getY() == newY && room.canSitOrLayAt(newX, newY))
					temp.setDiagonaly(true);
					adj.add(temp);
				}
			}
		}
		return adj;
	}

	public findPath(oldX: number, oldY: number, newX: number, newY: number, room: Room): Collections.Queue<AbstractNode> {
		if((oldX == newX) && (oldY == newY))
			return new Collections.Queue<AbstractNode>();

		this.openList = new Collections.LinkedList<AbstractNode>();
		this.closedList = new Collections.LinkedList<AbstractNode>();

		if(oldX > this.width || oldY > this.height || newX > this.width || newY > this.height)
			return new Collections.Queue<AbstractNode>();

		this.openList.add(this.nodes[oldX][oldY]);

		this.done = false;

		while(!this.done){
			let current: AbstractNode = this.lowestFInOpen();
			this.closedList.add(current);
			this.openList.remove(current);

			if((current.getX() == newX) && (current.getY() == newY) && !(Math.abs(room.getLayout().getHeightAtSquare(current.getX(), current.getY()) - room.getLayout().getHeightAtSquare(newX, newY)) > 1)){
				return this.calcPath(this.nodes[oldX][oldY], current, room);
			}

			let adjacentNodes: Collections.LinkedList<AbstractNode> = this.getAdjacent(current, newX, newY, room);

			for(let i = 0; i < adjacentNodes.size(); i++){
				let currentAdj: AbstractNode = adjacentNodes.elementAtIndex(i);

				if((Math.abs(room.getLayout().getHeightAtSquare(current.getX(), current.getY()) - room.getLayout().getHeightAtSquare(newX, newY)) > 1))
					continue;

				if(!this.openList.contains(currentAdj) || (currentAdj.getX() == newX && currentAdj.getY() == newY)){//(currentAdj.getX() == newX && currentAdj.getY() == newY && (room.canSitOrLayAt(newX, newY)))
					currentAdj.setPrevious(current);
					currentAdj.sethCostsNode(this.nodes[newX][newY]);
					currentAdj.setgCosts(current);
					this.openList.add(currentAdj);
				}else if(currentAdj.getgCosts() > currentAdj.calculategCosts(current)){
					currentAdj.setPrevious(current);
					currentAdj.setgCosts(current);
				}
			}

			if(this.openList.isEmpty()){
				return new Collections.Queue<AbstractNode>();
			}
		}
		return null;
	}
}