import {ship} from "../Models/Ship";
import {cell} from "../Models/Cell";
import {from} from "linq-to-typescript";
import {states} from "../Models/States";

export class fieldChecker {

  public UpdateDictionary(ships: ship[]): Map<number, ship[]> {
    let result: Map<number, ship[]> = new Map<number, ship[]>([
      [1,[]],
      [2,[]],
      [3,[]],
      [4,[]],
    ]);
    ships.forEach((ship) => {
      let count = ship.cells.length;
      if (!result.has(count))
        result.set(count, [])

      result.get(count)!.push(ship);
    })

    return result;
  }

  public GetShips(map: cell[][]): ship[] {
    let result: Map<cell, ship> = new Map<cell, ship>();
    let filledCells = from(map).selectMany(x => from(x)).where(x => x.state == states.HasShip).toArray();
    let counter = filledCells.length;

    filledCells.forEach(cell => {
      let neighbours = this.FindNeighbours(filledCells, cell);
      let newShip = new ship(neighbours);
      if (!result.has(newShip.firstCell))
        result.set(newShip.firstCell, newShip);
    });

    return from(result.values()).toArray();
  }


  public CheckArrangement(ships: ship[]): boolean {
    if (ships == null || ships.length == 0) return false;

    return from(ships).all(ship => from(ship.cells).select(cell => cell.x + 1).distinct().count() == 1
      || from(ship.cells).select(cell => cell.y + 1).distinct().count() == 1);
  }

  public CheckDictionary(dictionary: Map<number, ship[]>): boolean{
    return dictionary.get(1)!.length == 4
        && dictionary.get(2)!.length == 3
        && dictionary.get(3)!.length == 2
        && dictionary.get(4)!.length == 1;
  }

  private FindNeighbours(listToSearch: cell[], cell: cell): cell[] {
    let result: cell[] = [];
    result.push(cell);
    listToSearch = this.Delete(cell, listToSearch);
    this.FindNeighboursRecursive(cell, listToSearch, result);

    return from(result).orderBy(cell => cell.x).thenBy(cell => cell.y).toArray();
  }

  private Delete(item: any, list: any[]): any[] {
    return from(list).where(x => x != item).toArray();
  }

  private FindNeighboursRecursive(cell: cell, listToSearch: cell[], resultList: cell[]) {
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
