import {ship} from "./Ship";
import {Observable} from "rxjs";
import {gameService} from "../services/game.service";
import {stages} from "./Stages";

export class userState {
  gameCanBeStarted: boolean = false;
  ships: ship[] = [];
  dictionary: Map<number, ship[]> = new Map<number, ship[]>([
    [1, []], [2, []], [3, []], [4, []],
  ]);
  message: string = "Начинайте расставлять корабли на поле";

  private observer: Observable<ship[]>;

  constructor(private gameService: gameService) {
    this.observer = this.gameService.getShipsObservable;
  }

  update(): void {
    this.observer.subscribe(value => this.ships = value);
    this.dictionary = this.gameService.fieldChecker.UpdateDictionary(this.ships);
    this.gameCanBeStarted = false;

    if (!this.gameService.fieldChecker.CheckArrangement(this.ships)) {
      this.message = "Неправильная расстановка";
      return
    }

    if (!this.gameService.fieldChecker.CheckDictionary(this.dictionary)) {
      this.message = "Неправильное количество кораблей";
      return;
    }


    this.gameCanBeStarted = this.gameService.stage == stages.Preparation;
    this.message = "Все готово, можно начинать";
  }

  confirm(): void {
    this.update();
  }
}
