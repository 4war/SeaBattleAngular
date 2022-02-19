import { Component, OnInit } from '@angular/core';
import {Cell} from "../../Models/Cell";
import {States} from "../../Models/States";
const size = 10;

@Component({
  selector: 'app-ai-battle-field-component',
  templateUrl: './ai-battle-field-component.component.html',
  styleUrls: ['./ai-battle-field-component.component.css']
})
export class AiBattleFieldComponentComponent implements OnInit {

  public cells: Cell[][];

  constructor() {
    this.cells = this.fillCells();
  }

  ngOnInit(): void {
  }

  fillCells(): Cell[][] {
    let result: Cell[][] = [];
    for (let x = 0; x < size; x++) {
      result[x] = [];
      for (let y = 0; y < size; y++) {
        let cell = new Cell();
        cell.X = x;
        cell.Y = y;
        cell.State = States.Clear;
        result[x][y] = cell;
      }
    }

    return result;
  }

}
