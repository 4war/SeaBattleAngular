import {Component, OnInit} from '@angular/core';
import {CellComponent} from "../cell-component/cell.component";
import {BattleField} from "../../Models/BattleField";
import {size} from "../../Models/Game";

@Component({
  selector: 'app-user-battle-field-component',
  templateUrl: './user-battle-field.component.html',
  styleUrls: ['./user-battle-field.component.css']
})

export class UserBattleFieldComponent implements OnInit {
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
