import {Injectable} from '@angular/core';
import {fieldChecker} from "../Logic/FieldChecker";
import {BattleField} from "../Models/BattleField";
import {Reserve} from "../Models/Reserve";
import {Ship} from "../Models/Ship";
import {Stage} from "../Models/Stage";
import {Rules} from "../Models/rules";
import {Move} from "../Models/Move";
import {Side} from "../Models/Side";
import {Fight} from "../Logic/AI/Fight";
import {State} from "../Models/State";

export const size = 10;

@Injectable({
  providedIn: 'root'
})

export class GameService {

  get stageType(): typeof Stage {
    return Stage;
  }

  get moveType(): typeof Move {
    return Move;
  }

  stage = Stage.Preparation;
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

    this.userBattleField.autoFighter = new Fight(this, this.aiBattleField);
    this.aiBattleField.autoFighter = new Fight(this, this.userBattleField);
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

  changeMove(): void {
    this.move = this.move == Move.User ? Move.AI : Move.User;
    if (this.move == Move.AI)
      this.simulateAiDecision();
  }

  confirmDestroyedShip(ship: Ship, battleField: BattleField) {
    if (battleField.side == Side.User) {
      this.aiBattleField.autoFighter.destroy(ship);
    }
  }

  performAiMove(): void {
    let cell = this.aiBattleField.autoFighter.makeMove();
    if (this.userBattleField.map[cell.y][cell.x].state == State.HasShip) {
      this.aiBattleField.autoFighter.hit(cell);
      this.userBattleField.hit(cell);
      console.log(`Бот попал ${cell.x} ${cell.y}`);
      this.simulateAiDecision();
    } else {
      this.aiBattleField.autoFighter.miss(cell);
      this.userBattleField.miss(cell);
      console.log(`Бот промахнулся ${cell.x} ${cell.y}`);
    }
  }

  simulateAiDecision(): void{
    setTimeout(() => {
      this.performAiMove();
    }, 500);
  }

  startGame() {
    this.aiBattleField.arrangeAutomatically();
    this.userBattleField.hideMap();
    this.aiBattleField.hideMap();
    this.stage = Stage.Fight;
    this.userReserve.update();
    this.aiReserve.update();
  }

  endGame(side: Side) {
    this.aiBattleField.map.forEach(row => row.forEach(cell => cell.deselect()));
    this.stage = Stage.End;
    this.userReserve.message = side == Side.Ai ? `Победа` : `Поражение`;
  }

  restartGame() {
    this.aiBattleField.forgetArrangement();
    this.aiBattleField.clearMap();
    this.aiBattleField.autoFighter.reset();
    this.userBattleField.forgetArrangement();
    this.userBattleField.clearMap();
    this.userBattleField.autoFighter.reset();
    this.stage = Stage.Preparation;
    this.move = Move.User;
    this.userReserve.update();
  }
}

