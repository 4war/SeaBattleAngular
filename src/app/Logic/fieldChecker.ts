import {Ship} from "../Models/Ship";
import {Cell} from "../Models/Cell";
import {from} from "linq-to-typescript";
import {State} from "../Models/State";

export class fieldChecker {

  public UpdateDictionary(ships: Ship[]): Map<number, Ship[]> {
    let result: Map<number, Ship[]> = new Map<number, Ship[]>([
      [1,[]],
      [2,[]],
      [3,[]],
      [4,[]],
    ]);
    ships.forEach((ship) => {
      if (!from(ship.cells).all(c => c.state == State.Destroyed)){
        let count = ship.cells.length;
        if (!result.has(count))
          result.set(count, [])

        result.get(count)!.push(ship);
      }
    })

    return result;
  }

  public GetShips(map: Cell[][]): Ship[] {
    let result: Map<Cell, Ship> = new Map<Cell, Ship>();
    let filledCells = from(map).selectMany(x => from(x))
      .where(x => x.state == State.HasShip || x.state == State.Destroyed).toArray();
    let counter = filledCells.length;

    filledCells.forEach(cell => {
      let neighbours = this.FindNeighbours(filledCells, cell);
      let newShip = new Ship(neighbours);
      if (!result.has(newShip.firstCell))
        result.set(newShip.firstCell, newShip);
    });

    return from(result.values()).toArray();
  }


  public CheckArrangement(ships: Ship[]): boolean {
    if (ships == null || ships.length == 0) return false;

    return from(ships).all(ship => from(ship.cells).select(cell => cell.x + 1).distinct().count() == 1
      || from(ship.cells).select(cell => cell.y + 1).distinct().count() == 1);
  }

  public CheckDictionary(dictionary: Map<number, Ship[]>): boolean{
    return dictionary.get(1)!.length == 4
        && dictionary.get(2)!.length == 3
        && dictionary.get(3)!.length == 2
        && dictionary.get(4)!.length == 1;
  }

  private FindNeighbours(listToSearch: Cell[], cell: Cell): Cell[] {
    let result: Cell[] = [];
    result.push(cell);
    listToSearch = this.Delete(cell, listToSearch);
    this.FindNeighboursRecursive(cell, listToSearch, result);

    return from(result).orderBy(cell => cell.x).thenBy(cell => cell.y).toArray();
  }

  private Delete(item: any, list: any[]): any[] {
    return from(list).where(x => x != item).toArray();
  }

  private FindNeighboursRecursive(cell: Cell, listToSearch: Cell[], resultList: Cell[]) {
    if (listToSearch.length > 0) {
      for (let k = 0; k < listToSearch.length; k++) {
        let nextCell = listToSearch[k];
        if (
          (nextCell.x >= cell.x - 1 && nextCell.x <= cell.x + 1)
          && (nextCell.y >= cell.y - 1 && nextCell.y <= cell.y + 1)
        ) {
          resultList.push(nextCell);
          listToSearch = this.Delete(nextCell, listToSearch);
          k--;

          if (listToSearch.length > 0) {
            this.FindNeighboursRecursive(nextCell, listToSearch, resultList);
          }
        }
      }
    }
  }
}
