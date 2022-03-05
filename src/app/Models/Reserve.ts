import {Ship} from "./Ship";
import {GameService} from "../services/game.service";
import {Stage} from "./Stage";
import {BattleField} from "./BattleField";

export class Reserve {
  get gameCanBeStarted(): boolean {
    return this._gameCanBeStarted;
  }

  set gameCanBeStarted(value: boolean) {
    this._gameCanBeStarted = value;
  }
  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get restartVisible(): boolean {
    return this.gameService.stage != Stage.Preparation;
  }

  ships: Ship[] = [];
  dictionary: Map<number, Ship[]> = new Map<number, Ship[]>([
    [1, []], [2, []], [3, []], [4, []],
  ]);

  private _message: string = "Начинайте расставлять корабли на поле";
  private _gameCanBeStarted: boolean = false;

 // private observer: Observable<Ship[]>;

  constructor(private gameService: GameService, private battleField: BattleField) {
   // this.observer = this.gameService.getShipsObservable;
  }

  update(): void {
    this.ships = this.gameService.fieldChecker.GetShips(this.battleField.map);
    this.dictionary = this.gameService.fieldChecker.UpdateDictionary(this.ships);
    this.gameCanBeStarted = false;

    if (this.gameService.stage != Stage.Preparation)
      return;

    if (!this.gameService.fieldChecker.CheckArrangement(this.ships)) {
      this.message = "Неправильная расстановка";
      return;
    }

    if (!this.gameService.fieldChecker.CheckDictionary(this.dictionary)) {
      this.message = "Продолжайте расставлять корабли";
      return;
    }

    this.gameCanBeStarted = this.gameService.stage == Stage.Preparation;
    this.message = "Все готово, можно начинать";
  }

  confirm(): void {
    this.update();
  }
}
