import {Component, OnInit} from '@angular/core';
import {CellComponent} from "../cell-component/cell.component";
import {BattleField} from "../../Models/BattleField";
import {Sides} from "../../Models/Sides";
import {GameService} from "../../services/game.service";
import {Ship} from "../../Models/Ship";
import {Cell} from "../../Models/Cell";
import {from} from "linq-to-typescript";
import {States} from "../../Models/States";


@Component({
  selector: 'app-ai-battle-field-component',
  templateUrl: './ai-battle-field.component.html',
  styleUrls: ['./ai-battle-field.component.css']
})

export class AiBattleFieldComponent implements OnInit {
  public cellComponents: CellComponent[][] = [];

  side: Sides = Sides.Ai;
  battleField: BattleField;
  arrangement: Ship[];

  constructor(private gameService: GameService) {
    this.battleField = gameService.aiBattleField;
    this.battleField.arrangeAutomatically();
    this.arrangement = this.battleField.arrangement;
    this.setCellStates();
  }

  setCellStates(): void {
    let cellHasSet = new Set<Cell>(from(this.arrangement).selectMany(x => x.cells));
    console.log(cellHasSet.size);

    cellHasSet.forEach(cell => {
      this.battleField.map[cell.y][cell.x].state = States.HasShip;
    })

    // let cellsWithShips: Cell[] = [];
    // this.arrangement.forEach(ship => {
    //   ship.cells.forEach(cell => {
    //     cellsWithShips.push(cell);
    //   })
    // });

  }

  ngOnInit(): void {
  }
}
