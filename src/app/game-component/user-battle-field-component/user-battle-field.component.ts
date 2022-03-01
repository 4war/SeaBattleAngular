import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CellComponent} from "../cell-component/cell.component";
import {battleField} from "../../Models/BattleField";
import {sides} from "../../Models/Sides";
import {cell} from "../../Models/Cell";
import {gameService, size} from "../../services/game.service";
import {GameComponent} from "../game.component";

@Component({
  selector: 'app-user-battle-field-component',
  templateUrl: './user-battle-field.component.html',
  styleUrls: ['./user-battle-field.component.css']
})

export class UserBattleFieldComponent implements OnInit {
  @Output() onUpdate: EventEmitter<any> = new EventEmitter<any>();

  battleField: battleField;
  side: sides = sides.User;

  constructor(public gameService:gameService) {
    this.battleField = gameService.userBattleField;
  }

  ngOnInit(): void {
  }

  update(): void{
    this.onUpdate.emit();
  }
}
