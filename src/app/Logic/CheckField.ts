import {Ship} from "../Models/Ship";
import {Cell} from "../Models/Cell";
import {from} from "linq-to-typescript";
import {States} from "../Models/States";

export class CheckField {

  public GetDictionary(ships: Ship[]): Map<number, Ship[]> {
    let result: Map<number, Ship[]> = new Map<number, Ship[]>();
    ships.forEach((ship) => {
      let count = ship.Cells.length;
      if (!result.has(count))
        result.set(count, [])

      result.get(count)!.push(ship);
    })

    return result;
  }

  public GetMessage(map: Map<number, Ship[]>): string {
    let stringBuilder: string[] = [];
    let keys = from(map.keys()).toArray();
    let max = from(keys).max();
    for (let i = 1; i <= max; i++) {
      let count = map.has(i) ? map.get(i)!.length : 0;
      stringBuilder.push(`${i}: ${count}`);
    }

    return stringBuilder.join("\n");
  }

  public GetShips(map: Cell[][]): Ship[] {
    let result: Ship[] = [];
    let filledCells = from(map).selectMany(x => from(x)).where(x => x.State == States.HasShip).toArray();
    let counter = filledCells.length;

    filledCells.forEach(cell => {
      let neighbours = this.FindNeighbours(filledCells, cell);
      let ship = new Ship(neighbours);
      result.push(ship);
    });

    return result;
  }

  private FindNeighbours(listToSearch: Cell[], cell: Cell): Cell[] {
    let result: Cell[] = [];
    result.push(cell);
    listToSearch = this.Delete(cell, listToSearch);
    this.FindNeighboursRecursive(cell, listToSearch, result);

    return result;
  }

  private Delete(item: any, list: any[]): any[] {
    return from(list).where(x => x != item).toArray();
  }

  private FindNeighboursRecursive(cell: Cell, listToSearch: Cell[], resultList: Cell[]) {
    if (listToSearch.length > 0) {
      for (let k = 0; k < listToSearch.length; k++) {
        let nextCell = listToSearch[k];
        if (
          (nextCell.X >= cell.X - 1 && nextCell.X <= cell.X + 1)
          && (nextCell.Y >= cell.Y - 1 && nextCell.Y <= cell.Y + 1)
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
