import {Cell} from "./Cell";
import {States} from "./States";
import {CellComponent} from "../game-component/cell-component/cell.component";
import {BattleField} from "./BattleField";
import {UserBattleFieldComponent} from "../game-component/user-battle-field-component/user-battle-field.component";

export const size = 10;

export class Game{

  public UserBattleField: BattleField;
  public UserBattleFieldComponent: UserBattleFieldComponent;

  constructor() {
    this.UserBattleField = new BattleField();
    this.UserBattleFieldComponent = new UserBattleFieldComponent(this.UserBattleField);
  }



}
