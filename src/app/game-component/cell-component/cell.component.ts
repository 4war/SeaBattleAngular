import {Component, Input, OnInit} from '@angular/core';
import {Cell} from "../../Models/Cell";
import {CellStyles} from "../../CellStyles";
import {States} from "../../Models/States";

@Component({
  selector: 'app-cell-component',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  constructor() {
  }

  @Input('cell') Cell!: Cell;

  ngOnInit(): void {
  }

  getBgImageUrl(): string{
    return CellStyles.get(this.Cell.State)!;
  }

  selectCell() : void{
    if (this.Cell.State == States.Clear){
      this.Cell.State = States.Selected;
    }
  }

  deselectCell(): void{
    if (this.Cell.State == States.Selected){
      this.Cell.State = States.Clear;
    }
  }

  confirmClick(): void{
    if (this.Cell.State == States.Selected){
      this.Cell.State = States.HasShip;
    }
  }

}
