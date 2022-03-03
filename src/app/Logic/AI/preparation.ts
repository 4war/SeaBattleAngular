import {GameService, size} from "../../services/game.service";
import {Ship} from "../../Models/Ship";
import {Cell} from "../../Models/Cell";
import {BattleField} from "../../Models/BattleField";
import {ArgumentOutOfRangeException, from} from "linq-to-typescript";
import {States} from "../../Models/States";


export class Preparation {

  constructor(private gameService: GameService, private battleField: BattleField) {
  }

  setShipsAutomatically(): Ship[] {
    for (let i = 0; i < 10; i++) {
      let result: Ship[] = [];
      let ship = this.arrangeShip(4);
      result.push(ship);

      for (let i = 0; i < 2; i++) {
        let ship = this.arrangeShip(3);
        result.push(ship);
      }

      for (let i = 0; i < 3; i++) {
        let ship = this.arrangeShip(2);
        result.push(ship);
      }

      for (let i = 0; i < 4; i++) {
        let torpedoShip = this.arrangeShip(1);
        result.push(torpedoShip);
      }

      for (let cells = 4; cells >= 1; cells--) {
        let quantity = this.gameService.currentRules.quantities.get(cells)!;
      }

      if (this.checkField(result))
        return result;

      this.battleField.clearMap();
    }

    throw new ArgumentOutOfRangeException('Не удалось разместить корабли на поле');
  }

  private checkField(arrangement: Ship[]): boolean {
    return  from(this.battleField.map)
      .selectMany(row => row)
      .count(cell => cell.state == States.HasShip) == 20;
  }

  private arrangeShip(lengthOfShip: number): Ship {
    for (let i = 0; i < 100; i++) {
      let x = -1;
      let y = -1;
      for (; ;) {
        x = parseInt((Math.random() * size).toString());
        y = parseInt((Math.random() * size).toString());

        if (this.battleField.map[y][x].state == States.Clear)
          break;
      }

      let cellArray: Cell[] = [new Cell(x, y)];
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
            if (max < size - 1 && this.battleField.map[y][max + 1].state == States.Clear)
              nextPossibleCells.push(new Cell(max + 1, y));

            if (min > 0 && this.battleField.map[y][min - 1].state == States.Clear)
              nextPossibleCells.push(new Cell(min - 1, y));

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
            if (max < size - 1 && this.battleField.map[max + 1][x].state == States.Clear)
              nextPossibleCells.push(new Cell(x, max + 1));

            if (min > 0 && this.battleField.map[min - 1][x].state == States.Clear)
              nextPossibleCells.push(new Cell(x, min - 1));

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

  private updateMapAfterShip(newShip: Ship): void {
    newShip.cells.forEach(cell => this.battleField.map[cell.y][cell.x].state = States.HasShip);
    let first = from(newShip.cells).first();
    let last = from(newShip.cells).last();

    let left = first.x - 1;
    let right = last.x + 1;
    let up = first.y - 1;
    let down = last.y + 1;

    if (down < size)
      this.closeYBorders(left, right, down);

    if (up >= 0)
      this.closeYBorders(left, right, up);

    if (left >= 0)
      this.closeXBorders(up, down, left);

    if (right < size)
      this.closeXBorders(up, down, right);
  }

  private closeYBorders(left: number, right: number, yBorder: number): void {
    for (let x = left; x <= right; x++)
      if (x >= 0 && x < size)
        this.battleField.map[yBorder][x].state = States.Unavailable;
  }

  private closeXBorders(up: number, down: number, xBorder: number): void {
    for (let y = up; y <= down; y++)
      if (y >= 0 && y < size)
        this.battleField.map[y][xBorder].state = States.Unavailable;
  }

  private getRandomFromArray(array: Cell[]): Cell {
    if (array.length == 0)
      throw new ArgumentOutOfRangeException(`массив пустой`);
    let randomResult = parseInt((Math.random() * (array.length - 1)).toString());
    return array[randomResult];
  }
}
