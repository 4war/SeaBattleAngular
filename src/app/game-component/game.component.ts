import {Component, NgModule, OnInit} from '@angular/core';
import {UserBattleFieldComponent} from "./user-battle-field-component/user-battle-field.component";
import {Game} from "../Models/Game";
import {AiBattleFieldComponent} from "./ai-battle-field-component/ai-battle-field.component";

@Component({
  selector: 'app-game-component',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {

  public UserBattleFieldComponent: UserBattleFieldComponent;
  public AiBattleFieldComponent: AiBattleFieldComponent;

  constructor(public game: Game) {
    this.UserBattleFieldComponent = new UserBattleFieldComponent(game.UserBattleField);
    this.AiBattleFieldComponent = new AiBattleFieldComponent(game.UserBattleField);
  }

  ngOnInit(): void {
  }

}
