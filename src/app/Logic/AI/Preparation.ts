import {GameService, size} from "../../services/game.service";
import {Ship} from "../../Models/Ship";
import {Cell} from "../../Models/Cell";
import {BattleField} from "../../Models/BattleField";
import {ArgumentOutOfRangeException, from} from "linq-to-typescript";
import {State} from "../../Models/State";


export class Preparation {

  private fieldChecker;

  constructor(private gameService: GameService, private battleField: BattleField) {
    this.fieldChecker = this.gameService.fieldChecker;
  }

  setShipsAutomatically(): Ship[] {
    this.battleField.clearMap();
    for (let i = 0; i < 10; i++) {
      let result: Ship[] = [];

      let rules = this.gameService.currentRules;
      rules.quantities.forEach((value, key) => {
        for (let n = 0; n < key; n++) {
          let ship = this.arrangeShip(value);
          result.push(ship);
        }
      });

      if (this.checkField(result))
        return result;

      this.battleField.clearMap();
    }

    throw new ArgumentOutOfRangeException('Не удалось разместить корабли на поле');
  }

  setCellStates(arrangement: Ship[]): void {
    let cellHasSet = new Set<Cell>(from(arrangement).selectMany(x => x.cells));
    console.log(cellHasSet.size);

    cellHasSet.forEach(cell => {
      this.battleField.map[cell.y][cell.x].state = State.HasShip;
    })
  }

  updateUnavailableCells(): void {
    let ships = this.fieldChecker.GetShips(this.battleField.map);
    this.battleField.clearMap();
    ships.forEach(ship => {
      this.updateMapAfterShip(ship);
    });
  }

  private checkField(arrangement: Ship[]): boolean {
    return from(this.battleField.map)
      .selectMany(row => row)
      .count(cell => cell.state == State.HasShip) == this.gameService.currentRules.checkSum;
  }

  private arrangeShip(lengthOfShip: number): Ship {
    for (let i = 0; i < 100; i++) {
      let x = -1;
      let y = -1;
      for (; ;) {
        x = parseInt((Math.random() * size).toString());
        y = parseInt((Math.random() * size).toString());

        if (this.battleField.map[y][x].state == State.Clear)
          break;
      }

      let cellArray: Cell[] = [this.battleField.map[y][x]];
      let horizontal = Math.random() > 0.5;
      let flag = horizontal;
      for (let z = 0; z < 2; z++) {
        if (flag == horizontal && z == 1)
          break;

        for (let c = 0; c < lengthOfShip - 1; c++) {
          if (horizontal) {
            let nextPossibleCells: Cell[] = [];
            let max = from(cellArray).select(cell => cell.x).max();
            let min = from(cellArray).select(cell => cell.x).min();
            if (max < size - 1 && this.battleField.map[y][max + 1].state == State.Clear)
              nextPossibleCells.push(this.battleField.map[y][max + 1]);

            if (min > 0 && this.battleField.map[y][min - 1].state == State.Clear)
              nextPossibleCells.push(this.battleField.map[y][min - 1]);

            if (nextPossibleCells.length == 0) {
              horizontal = !horizontal;
              cellArray = from(cellArray).take(1).toArray();
              break;
            }

            let cell = this.getRandomFromArray(nextPossibleCells);
            cellArray.push(cell);
          } else {
            let nextPossibleCells: Cell[] = [];
            let max = from(cellArray).select(cell => cell.y).max();
            let min = from(cellArray).select(cell => cell.y).min();
            if (max < size - 1 && this.battleField.map[max + 1][x].state == State.Clear)
              nextPossibleCells.push(this.battleField.map[max + 1][x]);

            if (min > 0 && this.battleField.map[min - 1][x].state == State.Clear)
              nextPossibleCells.push(this.battleField.map[min - 1][x]);

            if (nextPossibleCells.length == 0) {
              horizontal = !horizontal;
              cellArray = from(cellArray).take(1).toArray();
              break;
            }

            let cell = this.getRandomFromArray(nextPossibleCells);
            cellArray.push(cell);
          }
        }
      }

      let newShip = new Ship(cellArray);
      this.updateMapAfterShip(newShip);
      return newShip;
    }

    throw new ArgumentOutOfRangeException('Не удалось поставить корабль с 10 раз');
  }

  public confirmArrangement(){
    this.battleField.arrangement.forEach(ship => this.updateMapAfterShip(ship));
  }

  private updateMapAfterShip(newShip: Ship): void {
    newShip.cells.forEach(cell => this.battleField.map[cell.y][cell.x].state = State.HasShip);
    let first = from(newShip.cells).first();
    let last = from(newShip.cells).last();

    let left = first.x - 1;
    let right = last.x + 1;
    let up = first.y - 1;
    let down = last.y + 1;

    if (down < size)
      this.closeYBorders(left, right, down, newShip);

    if (up >= 0)
      this.closeYBorders(left, right, up, newShip);

    if (left >= 0)
      this.closeXBorders(up, down, left, newShip);

    if (right < size)
      this.closeXBorders(up, down, right, newShip);
  }

  private closeYBorders(left: number, right: number, yBorder: number, ship: Ship): void {
    for (let x = left; x <= right; x++)
      if (x >= 0 && x < size && this.battleField.map[yBorder][x].state != State.HasShip) {
        this.battleField.map[yBorder][x].state = State.Unavailable;
        ship.unavailableCells.push(this.battleField.map[yBorder][x]);
      }

  }

  private closeXBorders(up: number, down: number, xBorder: number, ship: Ship): void {
    for (let y = up; y <= down; y++)
      if (y >= 0 && y < size && this.battleField.map[y][xBorder].state != State.HasShip) {
        this.battleField.map[y][xBorder].state = State.Unavailable;
        ship.unavailableCells.push(this.battleField.map[y][xBorder]);
      }
  }

  private getRandomFromArray(array: Cell[]): Cell {
    if (array.length == 0)
      throw new ArgumentOutOfRangeException(`массив пустой`);
    let randomResult = parseInt((Math.random() * (array.length - 1)).toString());
    return array[randomResult];
  }
}
