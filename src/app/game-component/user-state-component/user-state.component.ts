import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Observable} from "rxjs";
import {userState} from "../../Models/UserState";
import {Preparation} from "../../Logic/AI/preparation";

@Component({
  selector: 'app-user-state-component',
  templateUrl: './user-state.component.html',
  styleUrls: ['./user-state.component.css']
})

export class UserStateComponent implements OnInit {

  preparation: Preparation;
  userState: userState;
  constructor(public gameService: GameService) {
    this.userState = this.gameService.userState;
    this.preparation = new Preparation(this.gameService, this.gameService.userBattleField);
  }

  ngOnInit(): void {
  }

  startGame(): void{
    this.gameService.startGame();
    this.userState.message = 'Битва началась';
  }

  randomise(): void{
    this.gameService.userBattleField.arrangement = this.preparation.setShipsAutomatically();
    this.userState.update();
  }

  clear(): void{
    this.gameService.userBattleField.clearMap();
    this.userState.update();
  }
}
