import { Component, OnInit } from '@angular/core';
import {Cell} from "../../Models/Cell";
import {States} from "../../Models/States";
import {CellComponent} from "../cell-component/cell.component";
import {BattleField} from "../../Models/BattleField";
const size = 10;

@Component({
  selector: 'app-ai-battle-field-component',
  templateUrl: './ai-battle-field.component.html',
  styleUrls: ['./ai-battle-field.component.css']
})
export class AiBattleFieldComponent implements OnInit {
  public cellComponents: CellComponent[][] = [];

  constructor(public battleField: BattleField) {
    this.fillCellComponents();
  }

  private fillCellComponents(): void {
    for (let x = 0; x < size; x++) {
      this.cellComponents[x] = [];
      for (let y = 0; y < size; y++) {
        this.cellComponents[x][y] = new CellComponent();
      }
    }
  }

  ngOnInit(): void {
  }
}
