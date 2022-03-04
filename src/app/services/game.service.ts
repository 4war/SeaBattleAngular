import {Injectable} from '@angular/core';
import {fieldChecker} from "../Logic/FieldChecker";
import {BattleField} from "../Models/BattleField";
import {userState} from "../Models/UserState";
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

  get stage(): typeof Stage{
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
  }

  getShipsObservable: Observable<Ship[]> = new Observable<Ship[]>(observer => {
    let map = this.userBattleField.map;
    let ships = this.fieldChecker.GetShips(map);
    observer.next(ships);
  });

  userState = new userState(this);

  startGame() {
    this.aiBattleField.arrangeAutomatically();
    this.userState.update();
    this.currentStage = Stage.Fight;
  }

  endGame(side: Side){
    this.currentStage = Stage.End;
    this.userState.message = side == Side.Ai ? `Победа` : `Поражение`;
  }

  restartGame(){
    this.aiBattleField.clearMap();
    this.userBattleField.clearMap();
    this.currentStage = Stage.Preparation;
  }
}

