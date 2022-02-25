import {Component, Input, OnInit} from '@angular/core';
import {CellComponent} from "../cell-component/cell.component";
import {BattleField} from "../../Models/BattleField";
import {Game, size} from "../../Models/Game";
import {Sides} from "../../Models/Sides";
import {Cell} from "../../Models/Cell";

@Component({
  selector: 'app-user-battle-field-component',
  templateUrl: './user-battle-field.component.html',
  styleUrls: ['./user-battle-field.component.css']
})

export class UserBattleFieldComponent implements OnInit {
  public cellComponents: CellComponent[][] = [];

  @Input() battleField!: BattleField;
  public side: Sides = Sides.User;

  constructor(private game:Game) {
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

  showSomething(cell: Cell): void{
    this.game.confirmClick();
    console.log(JSON.stringify(cell));
  }

  ngOnInit(): void {
  }
}
