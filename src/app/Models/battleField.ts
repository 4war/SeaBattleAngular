import {cell} from "./Cell";
import {states} from "./States";
import {size} from "../services/game.service";

export class battleField {

  public map: cell[][];

  constructor() {
    this.map = this.fillMap();
  }

  public fillMap(): cell[][] {
    let result: cell[][] = [];
    for (let y = 0; y < size; y++) {
      result[y] = [];
      for (let x = 0; x < size; x++) {
        let newCell = new cell();
        newCell.x = x;
        newCell.y = y;
        newCell.state = states.Clear;
        result[y][x] = newCell;
      }
    }

    return result;
  }

}
