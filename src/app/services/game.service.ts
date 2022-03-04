import {Injectable} from '@angular/core';
import {fieldChecker} from "../Logic/FieldChecker";
import {BattleField} from "../Models/BattleField";
import {Reserve} from "../Models/Reserve";
import {Observable} from "rxjs";
import {Ship} from "../Models/Ship";
import {Stage} from "../Models/Stage";
import {Rules} from "../Models/rules";
import {Move} from "../Models/Move";
import {Side} from "../Models/Side";

export const size = 10;

@Injectable({
  providedIn: 'root'
})

export class GameService {

  get stage(): typeof Stage {
    return Stage;
  }

  currentStage = Stage.Preparation;
  move = Move.User;

  currentRules: Rules = new Rules();
  userBattleField: BattleField;
  aiBattleField: BattleField;

  fieldChecker = new fieldChecker();

  constructor() {
    this.userBattleField = new BattleField(this, Side.User);
    this.aiBattleField = new BattleField(this, Side.Ai);
    this.userReserve = new Reserve(this, this.userBattleField);
    this.aiReserve = new Reserve(this, this.aiBattleField);
  }

  // getUserShipsObservable: Observable<Ship[]> = new Observable<Ship[]>(observer => {
  //   let map = this.userBattleField.map;
  //   let ships = this.fieldChecker.GetShips(map);
  //   observer.next(ships);
  // });
  //
  // getEnemyShipsObservable: Observable<Ship[]> = new Observable<Ship[]>(observer => {
  //   let map = this.aiBattleField.map;
  //   let ships = this.fieldChecker.GetShips(map);
  //   observer.next(ships);
  // });

  userReserve: Reserve;
  aiReserve: Reserve;

  startGame() {
    this.aiBattleField.arrangeAutomatically();
    this.userReserve.update();
    this.aiReserve.update();
    this.currentStage = Stage.Fight;
  }

  endGame(side: Side) {
    this.aiBattleField.map.forEach(row => row.forEach(cell => cell.deselect()));
    this.currentStage = Stage.End;
    this.userReserve.message = side == Side.Ai ? `Победа` : `Поражение`;
    this.aiReserve.message = side == Side.Ai ? `Поражение` : `Победа`;
  }

  restartGame() {
    this.aiBattleField.clearMap();
    this.userBattleField.clearMap();
    this.currentStage = Stage.Preparation;
  }
}

