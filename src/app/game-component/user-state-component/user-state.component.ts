import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Observable} from "rxjs";
import {userState} from "../../Models/UserState";

@Component({
  selector: 'app-user-state-component',
  templateUrl: './user-state.component.html',
  styleUrls: ['./user-state.component.css']
})

export class UserStateComponent implements OnInit {

  userState: userState;
  constructor(private gameService: GameService) {
    this.userState = this.gameService.userState;
  }

  ngOnInit(): void {
  }

  startGame(): void{
    this.gameService.startGame();
    this.userState.message = 'Битва началась';
  }
}
