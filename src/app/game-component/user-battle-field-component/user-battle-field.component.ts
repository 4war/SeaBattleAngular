import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CellComponent} from "../cell-component/cell.component";
import {BattleField} from "../../Models/BattleField";
import {Side} from "../../Models/Side";
import {Cell} from "../../Models/Cell";
import {GameService, size} from "../../services/game.service";
import {GameComponent} from "../game.component";

@Component({
  selector: 'app-user-battle-field-component',
  templateUrl: './user-battle-field.component.html',
  styleUrls: ['./user-battle-field.component.css']
})

export class UserBattleFieldComponent implements OnInit {
  @Output() onUpdate: EventEmitter<any> = new EventEmitter<any>();

  battleField: BattleField;
  side: Side = Side.User;

  constructor(public gameService:GameService) {
    this.battleField = gameService.userBattleField;
  }

  ngOnInit(): void {
  }

  update(): void{
    this.onUpdate.emit();
  }
}
