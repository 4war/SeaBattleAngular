import {UserBattleFieldComponent} from "../game-component/user-battle-field-component/user-battle-field.component";
import {AiBattleFieldComponent} from "../game-component/ai-battle-field-component/ai-battle-field.component";
import {Cell} from "./Cell";
import {States} from "./States";
import {Game, size} from "./Game";

export class BattleField{

  public map: Cell[][];

  constructor() {
    this.map = this.fillMap();
  }

  public fillMap(): Cell[][] {
    let result: Cell[][] = [];
    for (let x = 0; x < size; x++) {
      result[x] = [];
      for (let y = 0; y < size; y++) {
        let cell = new Cell();
        cell.X = x;
        cell.Y = y;
        cell.State = States.Clear;
        result[x][y] = cell;
      }
    }

    return result;
  }

}
