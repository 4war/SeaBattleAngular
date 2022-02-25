import {Component, Input, OnInit} from '@angular/core';
import {CellComponent} from "../cell-component/cell.component";
import {BattleField} from "../../Models/BattleField";
import {Game, size} from "../../Models/Game";
import {Sides} from "../../Models/Sides";


@Component({
  selector: 'app-ai-battle-field-component',
  templateUrl: './ai-battle-field.component.html',
  styleUrls: ['./ai-battle-field.component.css']
})

export class AiBattleFieldComponent implements OnInit {
  public cellComponents: CellComponent[][] = [];

  public side: Sides = Sides.Ai;
  @Input() battleField!: BattleField;

  constructor(private game: Game) {
    this.fillCellComponents();
  }

  private fillCellComponents(): void {
    for (let x = 0; x < size; x++) {
      this.cellComponents[x] = [];
      for (let y = 0; y < size; y++) {
        this.cellComponents[x][y] = new CellComponent(this.game);
      }
    }
  }

  ngOnInit(): void {
  }
}
