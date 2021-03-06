import {Cell} from "./Cell";
import {from} from "linq-to-typescript";

export class Ship {
  firstCell: Cell;
  cells: Cell[];
  unavailableCells: Cell[] = [];
  destroyed: boolean = false;

  constructor(cells: Cell[]) {
    this.cells = from(cells).orderBy(cell => cell.x).thenBy(cell => cell.y).toArray();
    this.firstCell = from(cells).first();
  }
}
