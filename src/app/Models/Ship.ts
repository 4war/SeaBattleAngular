import {Cell} from "./Cell";

export class Ship{
  public Cells: Cell[];

  constructor(cells: Cell[]) {
    this.Cells = cells;
  }
}
