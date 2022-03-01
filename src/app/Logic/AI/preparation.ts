import {gameService} from "../../services/game.service";
import {ship} from "../../Models/ship";
import {cell} from "../../Models/cell";


export class Preparation {

  constructor(private gameService: gameService) {
  }

  SetShipsAutomatically(): void {
    let result: ship[] = [];
    for (let cells = 1; cells <= 4; cells++) {
      let quantity = this.gameService.currentRules.quantities.get(cells)!;

      for (let s = 0; s < quantity; s++){
        let newShip: cell[] = [];
      }
    }
  }
}
