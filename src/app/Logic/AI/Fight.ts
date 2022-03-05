import {GameService, size} from "../../services/game.service";
import {BattleField} from "../../Models/BattleField";
import {Cell} from "../../Models/Cell";
import {Ship} from "../../Models/Ship";
import {State} from "../../Models/State";
import {ArgumentOutOfRangeException, from} from "linq-to-typescript";
import {Orientation} from "../../Models/Orientation";

export class Fight {

  availableCells: Cell[][] = [];

  constructor(private gameService: GameService, private battleField: BattleField) {
    for (let y = 0; y < size; y++) {
      this.availableCells[y] = [];
      for (let x = 0; x < size; x++) {
        this.availableCells[y][x] = new Cell(x, y, this.battleField, this.gameService);
      }
    }
  }

  reset(): void {
    for (let y = 0; y < size; y++)
      for (let x = 0; x < size; x++)
        this.availableCells[y][x].state = State.Clear;
  }

  makeMove(): Cell {
    let shipToFocus = this.findUnfinishedShip();
    if (shipToFocus != null) {
      return this.tryToFinishShip(shipToFocus);
    }

    let randomList: Cell[] = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let cell = this.battleField.map[y][x];
        if (cell.state == State.Unavailable || cell.state == State.Destroyed)
          continue;

        randomList.push(cell);
      }
    }

    return this.getRandomCellFromList(randomList);
  }

  private tryToFinishShip(ship: Ship): Cell{
    let orientation = this.getOrientation(ship);
    if (orientation == Orientation.Horizontal) {
      return this.tryToFinishShipHorizontally(ship)!;
    }
    if (orientation == Orientation.Vertical) {
      return this.tryToFinishShipVertically(ship)!;
    }

    let randomResultList: Cell[] = [];
    let horizontalTry = this.tryToFinishShipHorizontally(ship);
    if (horizontalTry != null)
      randomResultList.push(horizontalTry);

    let verticalTry = this.tryToFinishShipVertically(ship);
    if (verticalTry != null)
      randomResultList.push(verticalTry);

    return this.getRandomCellFromList(randomResultList);
  }

  private tryToFinishShipHorizontally(ship: Ship): Cell | null {
    let knownCells = from(ship.cells).where(c => c.state == State.Destroyed).toArray();
    let first = from(knownCells).first(cell => cell.x == (from(knownCells).min(c => c.x)))
    let last = from(knownCells).first(cell => cell.x == (from(knownCells).max(c => c.x)))
    let distance = last.x - first.x - 1;

    if (knownCells.length < distance + 2) {
      let randomResultList: Cell[] = [];
      for (let i = first.x + 1; i < last.x; i++) {
        randomResultList.push(this.battleField.map[first.y][i]);
      }

      return this.getRandomCellFromList(randomResultList);
    }

    let randomResultList: Cell[] = [];
    if (first.x > 0 && this.availableCells[first.y][first.x - 1].state != State.Unavailable)
      randomResultList.push(this.battleField.map[first.y][first.x - 1]);
    if (last.x < size - 1 && this.availableCells[last.y][last.x + 1].state != State.Unavailable)
      randomResultList.push(this.battleField.map[last.y][last.x + 1]);

    if (randomResultList.length == 0)
      return null;

    return this.getRandomCellFromList(randomResultList);
  }

  private tryToFinishShipVertically(ship: Ship): Cell | null {
    let knownCells = from(ship.cells).where(c => c.state == State.Destroyed).toArray();
    let first = from(knownCells).first(cell => cell.y == (from(knownCells).min(c => c.y)))
    let last = from(knownCells).first(cell => cell.y == (from(knownCells).max(c => c.y)))
    let distance = last.y - first.y - 1;

    if (knownCells.length < distance + 2) {
      let randomResultList: Cell[] = [];
      for (let i = first.y + 1; i < last.y; i++) {
        randomResultList.push(this.battleField.map[i][first.x]);
      }

      return this.getRandomCellFromList(randomResultList);
    }

    let randomResultList: Cell[] = [];
    if (first.y > 0 && this.availableCells[first.y - 1][first.x].state != State.Unavailable)
      randomResultList.push(this.battleField.map[first.y - 1][first.x]);
    if (last.y < size - 1 && this.availableCells[last.y + 1][last.x].state != State.Unavailable)
      randomResultList.push(this.battleField.map[last.y + 1][last.x]);

    if (randomResultList.length == 0)
      return null;

    return this.getRandomCellFromList(randomResultList);
  }

  getOrientation(ship: Ship): Orientation {
    let knownCells = from(ship.cells).where(c => c.state == State.Destroyed).toArray();
    let knownUnavailableCells = from(ship.unavailableCells).where(c => c.visible).toArray();

    if (knownCells.length == 0)
      throw new ArgumentOutOfRangeException('Сюда не должен попасть полный корабль');

    if (knownCells.length == 1) {
      return Orientation.Unknown;
    }

    let first = knownCells[0];
    let second = knownCells[1];

    if (first.y == second.y)
      return Orientation.Horizontal;
    if (first.x == second.x)
      return Orientation.Vertical;

    throw new ArgumentOutOfRangeException('Здесь был получен неправильный корабль');
  }

  findUnfinishedShip(): Ship | null {
    return from(this.battleField.arrangement)
      .where(ship => !ship.destroyed)
      .firstOrDefault(ship => from(ship.cells).any(cell => cell.state == State.Destroyed));
  }

  getRandomCellFromList(list: Cell[]): Cell {
    return list[parseInt((Math.random() * (list.length - 1)).toString())];
  }

  hit(cell: Cell) {
    this.availableCells[cell.y][cell.x].state = State.Destroyed;
  }

  miss(cell: Cell) {
    this.availableCells[cell.y][cell.x].state = State.Unavailable;
  }

  destroy(ship: Ship): void {
    ship.unavailableCells.forEach(cell => {
      this.availableCells[cell.y][cell.x].state = State.Unavailable;
    })
  }
}
