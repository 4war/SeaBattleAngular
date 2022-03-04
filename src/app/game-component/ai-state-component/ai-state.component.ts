import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";
import {Preparation} from "../../Logic/AI/preparation";
import {Reserve} from "../../Models/Reserve";

@Component({
  selector: 'app-ai-state-component',
  templateUrl: './ai-state.component.html',
  styleUrls: ['./ai-state.component.css', '../game.component.css']
})
export class AiStateComponent implements OnInit {

  reserve: Reserve;

  constructor(public gameService: GameService) {
    this.reserve = this.gameService.aiReserve;
  }

  ngOnInit(): void {
  }
}
