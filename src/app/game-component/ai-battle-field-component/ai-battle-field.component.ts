import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CellComponent} from "../cell-component/cell.component";
import {BattleField} from "../../Models/BattleField";
import {Side} from "../../Models/Side";
import {GameService} from "../../services/game.service";
import {Ship} from "../../Models/Ship";


@Component({
  selector: 'app-ai-battle-field-component',
  templateUrl: './ai-battle-field.component.html',
  styleUrls: ['./ai-battle-field.component.css']
})

export class AiBattleFieldComponent implements OnInit {

  @Output() onEnemyUpdate: EventEmitter<any> = new EventEmitter<any>();
  public cellComponents: CellComponent[][] = [];

  side: Side = Side.Ai;
  battleField: BattleField;

  constructor(private gameService: GameService) {
    this.battleField = gameService.aiBattleField;
  }

  ngOnInit(): void {
  }

  update(): void{
    this.onEnemyUpdate.emit();
  }
}
