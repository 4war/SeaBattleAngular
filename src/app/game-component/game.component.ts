import {Component, NgModule, OnInit} from '@angular/core';
import {UserBattleFieldComponent} from "./user-battle-field-component/user-battle-field.component";
import {Game} from "../Models/Game";
import {AiBattleFieldComponent} from "./ai-battle-field-component/ai-battle-field.component";
import {UserStateComponent} from "./user-state-component/user-state.component";
import {CheckField} from "../Logic/CheckField";
import {GameService} from "../services/game.service";

@Component({
  selector: 'app-game-component',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {

  public UserBattleFieldComponent: UserBattleFieldComponent;
  public AiBattleFieldComponent: AiBattleFieldComponent;

  public UserStateComponent: UserStateComponent;

  constructor(public game: Game, private checkField: CheckField) {

    this.UserBattleFieldComponent = new UserBattleFieldComponent(this.game);
    this.AiBattleFieldComponent = new AiBattleFieldComponent(this.game);

    this.UserStateComponent = new UserStateComponent(this.game, this.checkField);
  }

  ngOnInit(): void {
    //this.gameService.nazvanieMethoda().subscribe(value => console.log(value));
  }

}
