import {Component, EventEmitter, Input, NgModule, OnInit, ViewChild} from '@angular/core';
import {GameService} from "../services/game.service";
import {UserBattleFieldComponent} from "./user-battle-field-component/user-battle-field.component";
import {UserStateComponent} from "./user-state-component/user-state.component";
import {AiBattleFieldComponent} from "./ai-battle-field-component/ai-battle-field.component";
import {AiStateComponent} from "./ai-state-component/ai-state.component";

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

  @ViewChild(AiBattleFieldComponent)
  aiBattleFieldComponent!: AiBattleFieldComponent;

  @ViewChild(AiStateComponent)
  aiStateComponent!: AiStateComponent;

  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
  }

  update(): void{
    this.gameService.userReserve.update();
    this.gameService.aiReserve.update();
  }
}
