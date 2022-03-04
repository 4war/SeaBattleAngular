import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Observable} from "rxjs";
import {Reserve} from "../../Models/Reserve";
import {Preparation} from "../../Logic/AI/preparation";

@Component({
  selector: 'app-user-state-component',
  templateUrl: './user-state.component.html',
  styleUrls: ['./user-state.component.css', '../game.component.css']
})

export class UserStateComponent implements OnInit {

  preparation: Preparation;
  reserve: Reserve;
  constructor(public gameService: GameService) {
    this.reserve = this.gameService.userReserve;
    this.preparation = new Preparation(this.gameService, this.gameService.userBattleField);
  }

  ngOnInit(): void {
  }

  startGame(): void{
    this.gameService.startGame();
    this.reserve.message = 'Битва началась';
  }

  restartGame(): void{
    this.gameService.restartGame();
  }

  randomise(): void{
    this.gameService.userBattleField.arrangement = this.preparation.setShipsAutomatically();
    this.reserve.update();
  }

  clear(): void{
    this.gameService.userBattleField.clearMap();
    this.reserve.update();
  }
}
