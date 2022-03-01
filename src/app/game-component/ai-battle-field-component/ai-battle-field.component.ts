import {Component, Input, OnInit} from '@angular/core';
import {CellComponent} from "../cell-component/cell.component";
import {battleField} from "../../Models/BattleField";
import {sides} from "../../Models/Sides";
import {gameService, size} from "../../services/game.service";


@Component({
  selector: 'app-ai-battle-field-component',
  templateUrl: './ai-battle-field.component.html',
  styleUrls: ['./ai-battle-field.component.css']
})

export class AiBattleFieldComponent implements OnInit {
  public cellComponents: CellComponent[][] = [];

  side: sides = sides.Ai;
  battleField: battleField;

  constructor(private gameService: gameService) {
    this.fillCellComponents();
    this.battleField = gameService.aiBattleField;
  }

  private fillCellComponents(): void {
    for (let x = 0; x < size; x++) {
      this.cellComponents[x] = [];
      for (let y = 0; y < size; y++) {
        this.cellComponents[x][y] = new CellComponent(this.gameService);
      }
    }
  }

  ngOnInit(): void {
  }
}
