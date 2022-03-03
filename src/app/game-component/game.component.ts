import {Component, EventEmitter, Input, NgModule, OnInit, ViewChild} from '@angular/core';
import {GameService} from "../services/game.service";
import {UserBattleFieldComponent} from "./user-battle-field-component/user-battle-field.component";
import {UserStateComponent} from "./user-state-component/user-state.component";

@Component({
  selector: 'app-game-component',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {

  @ViewChild(UserBattleFieldComponent)
  userBattleFieldComponent!: UserBattleFieldComponent;

  @ViewChild(UserStateComponent)
  userStateComponent!: UserStateComponent;

  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
  }

  update(): void{
    this.gameService.userState.update();
  }
}
