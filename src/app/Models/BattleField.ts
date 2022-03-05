import {Cell} from "./Cell";
import {State} from "./State";
import {GameService, size} from "../services/game.service";
import {Preparation} from "../Logic/AI/preparation";
import {Ship} from "./Ship";
import {from} from "linq-to-typescript";
import {Side} from "./Side";
import {Fight} from "../Logic/AI/Fight";

export class BattleField {

  map: Cell[][];
  preparation: Preparation;
  arrangement: Ship[] = [];
  autoFighter!: Fight;

  constructor(private gameService: GameService, public side: Side) {
    this.map = this.fillMap();
    this.preparation = new Preparation(this.gameService, this);
  }

  hideMap(): void {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (this.map[y][x].state != State.HasShip){
          this.map[y][x].visible = false;
        }
      }
    }
  }

  UpdateDestroyedShips(): void {
    let ship = from(this.arrangement)
      .where(s => !s.destroyed)
      .firstOrDefault(s => from(s.cells).all(cell => cell.state == State.Destroyed))

    if (ship != null) {
      this.destroy(ship);
      this.gameService.confirmDestroyedShip(ship, this);
    }
  }

  hit(cell: Cell) {
    this.map[cell.y][cell.x].state = State.Destroyed;
    this.UpdateDestroyedShips();
  }

  destroy(ship: Ship) {
    ship.destroyed = true;
    ship.unavailableCells.forEach(cell => cell.visible = true);
    if (from(this.arrangement).all(s => s.destroyed)) {
      this.gameService.endGame(this.side);
    }
  }

  miss(cell: Cell) {
    this.gameService.changeMove();
    this.map[cell.y][cell.x].state = State.Shot;
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

  clearMap(): void {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let cell = this.map[y][x];
        cell.state = State.Clear;
        cell.visible = false;
        cell.selected = false;
      }
    }
  }

  arrangeAutomatically(): void {
    this.arrangement = this.preparation.setShipsAutomatically();
    this.preparation.setCellStates(this.arrangement);
    this.preparation.updateUnavailableCells();
  }
}
