import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cell} from "../../Models/Cell";
import {CellStyles} from "../../CellStyles";
import {State} from "../../Models/State";
import {Side} from "../../Models/Side";
import {GameService} from "../../services/game.service";
import {Stage} from "../../Models/Stage";

@Component({
  selector: 'app-cell-component',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css', '../game.component.css']
})


export class CellComponent implements OnInit {

  get sideType(): typeof Side {
    return Side;
  }

  @Output() onClick: EventEmitter<Cell> = new EventEmitter<Cell>();

  shouldGlow = false;

  constructor(private gameService: GameService) {
  }

  @Input('cell') cell!: Cell;
  @Input('side') side!: Side;

  ngOnInit(): void {
    this.cell.side = this.side;
  }

  getBgImageUrl(): string {
    if (this.cell.selected)
      return CellStyles.get(this.cell.side)!.get(State.Selected)!;

    if (this.cell.state == State.Unavailable && !this.cell.visible)
      return CellStyles.get(this.cell.side)!.get(State.Clear)!;

    if (this.cell.state == State.HasShip && this.cell.side == Side.Ai && !this.cell.visible)
      return CellStyles.get(this.cell.side)!.get(State.Clear)!;

    return CellStyles.get(this.cell.side)!.get(this.cell.state)!;
  }

  selectCell(): void {
    this.cell.select();
    this.shouldGlow = true;
  }

  deselectCell(): void{
    this.cell.deselect();
    this.shouldGlow = false;
  }

  confirmClick(): void {
    this.cell.click();
    this.onClick.emit();
  }

  clearCell(): void {
    this.cell.clear();
  }
}
