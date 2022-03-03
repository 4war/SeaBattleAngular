import {Injectable} from '@angular/core';
import {fieldChecker} from "../Logic/FieldChecker";
import {BattleField} from "../Models/BattleField";
import {userState} from "../Models/UserState";
import {Observable} from "rxjs";
import {Ship} from "../Models/Ship";
import {stages} from "../Models/Stages";
import {rules} from "../Models/rules";

export const size = 10;


@Injectable({
  providedIn: 'root'
})

export class GameService {
  stage: stages = stages.Preparation;
  currentRules: rules = new rules();
  userBattleField: BattleField;
  aiBattleField: BattleField;

  fieldChecker = new fieldChecker();

  constructor() {
    this.userBattleField = new BattleField(this);
    this.aiBattleField = new BattleField(this);
  }

  getShipsObservable: Observable<Ship[]> = new Observable<Ship[]>(observer => {
    let map = this.userBattleField.map;
    let ships = this.fieldChecker.GetShips(map);
    observer.next(ships);
  });

  userState = new userState(this);

  startGame() {
    this.stage = stages.Fight;
  }
}

