import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cell} from "../../Models/Cell";
import {CellStyles} from "../../CellStyles";
import {States} from "../../Models/States";
import {Sides} from "../../Models/Sides";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-cell-component',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})


export class CellComponent implements OnInit {

  @Output() onClick: EventEmitter<Cell> = new EventEmitter<Cell>();

  constructor(private gameService: GameService) {

  }

  @Input('cell') cell!: Cell;
  @Input('side') side!: Sides;

  ngOnInit(): void {
    this.cell.side = this.side;
  }

  getBgImageUrl(): string{
    return CellStyles.get(this.cell.side)!.get(this.cell.state)!;
  }

  selectCell() : void{
    if (this.cell.state == States.Clear){
      this.cell.state = States.Selected;
    }
  }

  deselectCell(): void{
    if (this.cell.state == States.Selected){
      this.cell.state = States.Clear;
    }
  }

  confirmClick(): void{
    if (this.cell.state == States.HasShip){
      this.cell.state = States.Clear;
      this.onClick.emit();
      return;
    }

    if (this.cell.state == States.Selected){
      this.cell.state = States.HasShip;
      this.onClick.emit();
      return;
    }
  }

  clearCell(): void{
    if (this.cell.state == States.HasShip){
      this.cell.state = States.Clear;
    }
  }
}
