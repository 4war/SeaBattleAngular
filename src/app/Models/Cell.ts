import {State} from "./State";
import {Side} from "./Side";
import {GameService} from "../services/game.service";
import {Stage} from "./Stage";
import {Move} from "./Move";
import {BattleField} from "./BattleField";

export class Cell {
  x: number = 0;
  y: number = 0;
  selected = false;
  visible = false;
  state: State = State.Clear;
  side: Side = Side.User;

  get stage(): Stage {
    return this.gameService.currentStage;
  }

  constructor(x: number, y: number, private battleField: BattleField, private gameService: GameService) {
    this.x = x;
    this.y = y;
  }

  click(): void {
    switch (this.stage) {
      case Stage.Preparation: {
        if (this.side == Side.Ai)
          return;

        if (this.state == State.HasShip) {
          this.state = State.Clear;

          this.gameService.userBattleField.preparation.updateUnavailableCells();
          return;
        }

        if (this.selected || this.state == State.Clear || this.state == State.Unavailable) {
          this.state = State.HasShip;
          this.gameService.userBattleField.preparation.updateUnavailableCells();
          return;
        }
        break;
      }

      case Stage.Fight: {
        if (this.state == State.HasShip) {

          this.state = State.Destroyed;
          this.battleField.hit(this);
        } else {
          this.state = State.Shot;
          this.battleField.miss(this);
        }
        break;
      }

      case Stage.End: {
        break;
      }
    }
  }

  select(): void {
    switch (this.stage) {
      case Stage.Preparation: {
        if (!this.selected && this.side == Side.User) {
          this.selected = true;
        }
        break;
      }
      case Stage.Fight: {
        if (this.side == Side.Ai && this.gameService.move == Move.User) {
          if (this.state != State.Shot && this.state != State.Destroyed) {
            this.selected = true;
          }
        }
        break;
      }

      case Stage.End: {
        break;
      }

    }
  }

  deselect(): void {
    switch (this.stage) {
      case Stage.Preparation:
        if (this.selected) {
          this.selected = false;
        }
        break;
      case Stage.Fight: {
        if (this.selected)
          this.selected = false;
        break;
      }

      case Stage.End:

        break;
    }
  }

  clear(): void {
    if (this.state == State.HasShip) {
      this.state = State.Clear;
    }
  }
}
