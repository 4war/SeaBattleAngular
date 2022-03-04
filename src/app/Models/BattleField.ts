import {Cell} from "./Cell";
import {State} from "./State";
import {GameService, size} from "../services/game.service";
import {Preparation} from "../Logic/AI/preparation";
import {Ship} from "./Ship";
import {from} from "linq-to-typescript";
import {Move} from "./Move";
import {Side} from "./Side";

export class BattleField {

  map: Cell[][];
  preparation: Preparation;
  arrangement: Ship[] = [];

  constructor(private gameService: GameService, private side: Side) {
    this.map = this.fillMap();
    this.preparation = new Preparation(this.gameService, this);
  }

  UpdateDestroyedShips(): void{
    let ship = from(this.arrangement)
      .where(s => !s.destroyed)
      .firstOrDefault(s => from(s.cells).all(cell => cell.state == State.Destroyed))

    if (ship != null){
      this.destroy(ship);
    }
  }

  hit(cell: Cell){
    this.UpdateDestroyedShips();
  }

  destroy(ship: Ship){
    ship.destroyed = true;
    ship.unavailableCells.forEach(cell => cell.visible = true);
    if (from(this.arrangement).all(s => s.destroyed)){
      this.gameService.endGame(this.side);
    }
  }

  miss(cell: Cell){
    // this.gameService.move = Move.User ? Move.AI : Move.User;
    this.gameService.move = Move.User;
  }

  fillMap(): Cell[][] {
    let result: Cell[][] = [];
    for (let y = 0; y < size; y++) {
      result[y] = [];
      for (let x = 0; x < size; x++) {
        let newCell = new Cell(x, y, this, this.gameService);
        newCell.state = State.Clear;
        result[y][x] = newCell;
      }
    }

    return result;
  }

  clearMap(): void{
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        this.map[y][x].state = State.Clear;
      }
    }
  }

  arrangeAutomatically(): void{
    this.arrangement = this.preparation.setShipsAutomatically();
    this.preparation.setCellStates(this.arrangement);
    this.preparation.updateUnavailableCells();
  }
}
