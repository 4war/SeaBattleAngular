import {Cell} from "./Cell";
import {States} from "./States";
import {CellComponent} from "../game-component/cell-component/cell.component";
import {BattleField} from "./BattleField";
import {UserBattleFieldComponent} from "../game-component/user-battle-field-component/user-battle-field.component";
import {UserStateController} from "./UserStateController";
import {GameComponent} from "../game-component/game.component";
import {CheckField} from "../Logic/CheckField";

export const size = 10;

export class Game{

  public UserBattleField: BattleField;
  public AiBattleField: BattleField;
  public UserStateController: UserStateController;

  public GameComponent: GameComponent = new GameComponent(this, new CheckField());

  constructor() {
    this.UserBattleField = new BattleField();
    this.AiBattleField = new BattleField();
    this.UserStateController = new UserStateController();
  }

  public confirmClick(): void{
    this.GameComponent.UserStateComponent.update();
  }

}
