import {Component, OnInit} from '@angular/core';
import {Game} from "../../Models/Game";
import {from} from "linq-to-typescript";
import {CheckField} from "../../Logic/CheckField";
import {Ship} from "../../Models/Ship";

@Component({
  selector: 'app-user-state-component',
  templateUrl: './user-state.component.html',
  styleUrls: ['./user-state.component.css']
})


export class UserStateComponent implements OnInit {

  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
  }

  private _message: string = '';

  ships: Ship[] = [];
  dictionary: Map<number, Ship[]> = new Map<number, Ship[]>();

  constructor(private game: Game, private checkField: CheckField) { }

  ngOnInit(): void {
  }

  update(): void{
    let map = this.game.UserBattleField.map;
    this.ships = this.checkField.GetShips(map);
    this.dictionary = this.checkField.GetDictionary(this.ships);
    this.message = this.checkField.GetMessage(this.dictionary);
    console.log(this.message);
  }

  confirm(): void {
    this.update();
  }
}
