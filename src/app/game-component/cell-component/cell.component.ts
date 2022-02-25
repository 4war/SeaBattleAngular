import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cell} from "../../Models/Cell";
import {CellStyles} from "../../CellStyles";
import {States} from "../../Models/States";
import {Sides} from "../../Models/Sides";
import {Game} from "../../Models/Game";

@Component({
  selector: 'app-cell-component',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Output() onClick: EventEmitter<Cell> = new EventEmitter<Cell>();

  constructor(private game: Game) {
  }

  @Input('cell') cell!: Cell;
  @Input('side') side!: Sides;

  ngOnInit(): void {
    this.cell.Side = this.side;
  }

  getBgImageUrl(): string{
    return CellStyles.get(this.cell.Side)!.get(this.cell.State)!;
  }

  selectCell() : void{
    if (this.cell.State == States.Clear){
      this.cell.State = States.Selected;
    }
  }

  deselectCell(): void{
    if (this.cell.State == States.Selected){
      this.cell.State = States.Clear;
    }
  }

  confirmClick(): void{
    if (this.cell.State == States.Selected){
      this.cell.State = States.HasShip;
    }

    this.onClick.emit(this.cell);
  }
}
