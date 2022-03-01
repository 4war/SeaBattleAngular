import {Injectable} from '@angular/core';
import {fieldChecker} from "../Logic/FieldChecker";
import {battleField} from "../Models/BattleField";
import {userState} from "../Models/UserState";
import {Observable} from "rxjs";
import {ship} from "../Models/Ship";
import {stages} from "../Models/Stages";
import {rules} from "../Models/rules";

export const size = 10;


@Injectable({
  providedIn: 'root'
})

export class gameService {

  stage: stages = stages.Preparation;

  userBattleField = new battleField();
  aiBattleField = new battleField();

  fieldChecker = new fieldChecker();

  currentRules: rules = new rules();

  constructor() {
  }

  getShipsObservable: Observable<ship[]> = new Observable<ship[]>(observer => {
    let map = this.userBattleField.map;
    let ships = this.fieldChecker.GetShips(map);
    observer.next(ships);
  });

  userState = new userState(this);

  startGame(){
    this.stage = stages.Fight;
  }
}

