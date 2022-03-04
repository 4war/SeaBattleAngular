import {Component, OnInit} from '@angular/core';
import {CellComponent} from "../cell-component/cell.component";
import {BattleField} from "../../Models/BattleField";
import {Side} from "../../Models/Side";
import {GameService} from "../../services/game.service";
import {Ship} from "../../Models/Ship";
import {Cell} from "../../Models/Cell";
import {from} from "linq-to-typescript";
import {State} from "../../Models/State";


@Component({
  selector: 'app-ai-battle-field-component',
  templateUrl: './ai-battle-field.component.html',
  styleUrls: ['./ai-battle-field.component.css']
})

export class AiBattleFieldComponent implements OnInit {
  public cellComponents: CellComponent[][] = [];

  side: Side = Side.Ai;
  battleField: BattleField;
  arrangement: Ship[] = [];

  constructor(private gameService: GameService) {
    this.battleField = gameService.aiBattleField;
  }

  ngOnInit(): void {
  }
}
