import {cell} from "./Cell";
import {from} from "linq-to-typescript";

export class ship {
  firstCell: cell;
  cells: cell[];

  constructor(cells: cell[]) {
    this.cells = from(cells).orderBy(cell => cell.x).thenBy(cell => cell.y).toArray();
    this.firstCell = from(cells).first();
  }
}
