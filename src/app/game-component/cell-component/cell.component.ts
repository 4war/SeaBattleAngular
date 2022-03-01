import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {cell} from "../../Models/Cell";
import {CellStyles} from "../../CellStyles";
import {states} from "../../Models/States";
import {sides} from "../../Models/Sides";
import {gameService} from "../../services/game.service";

@Component({
  selector: 'app-cell-component',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})


export class CellComponent implements OnInit {

  @Output() onClick: EventEmitter<cell> = new EventEmitter<cell>();

  constructor(private gameService: gameService) {

  }

  @Input('cell') cell!: cell;
  @Input('side') side!: sides;

  ngOnInit(): void {
    this.cell.side = this.side;
  }

  getBgImageUrl(): string{
    return CellStyles.get(this.cell.side)!.get(this.cell.state)!;
  }

  selectCell() : void{
    if (this.cell.state == states.Clear){
      this.cell.state = states.Selected;
    }
  }

  deselectCell(): void{
    if (this.cell.state == states.Selected){
      this.cell.state = states.Clear;
    }
  }

  confirmClick(): void{
    if (this.cell.state == states.HasShip){
      this.cell.state = states.Clear;
      this.onClick.emit();
      return;
    }

    if (this.cell.state == states.Selected){
      this.cell.state = states.HasShip;
      this.onClick.emit();
      return;
    }
  }

  clearCell(): void{
    if (this.cell.state == states.HasShip){
      this.cell.state = states.Clear;
    }
  }
}
