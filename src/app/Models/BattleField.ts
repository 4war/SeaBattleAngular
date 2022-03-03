import {Cell} from "./Cell";
import {States} from "./States";
import {GameService, size} from "../services/game.service";
import {Preparation} from "../Logic/AI/preparation";
import {Ship} from "./Ship";

export class BattleField {

  map: Cell[][];

  preparation: Preparation;
  arrangement: Ship[] = [];

  constructor(private gameService: GameService) {
    this.map = this.fillMap();
    this.preparation = new Preparation(this.gameService, this);
  }

  fillMap(): Cell[][] {
    let result: Cell[][] = [];
    for (let y = 0; y < size; y++) {
      result[y] = [];
      for (let x = 0; x < size; x++) {
        let newCell = new Cell(x, y);
        newCell.state = States.Clear;
        result[y][x] = newCell;
      }
    }

    return result;
  }

  clearMap(): void{
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        this.map[y][x].state = States.Clear;
      }
    }
  }

  arrangeAutomatically(): void{
    this.arrangement = this.preparation.setShipsAutomatically();
  }
}
