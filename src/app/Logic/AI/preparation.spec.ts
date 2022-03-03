import {TestBed} from '@angular/core/testing';

import {GameService} from "../../services/game.service";
import {Preparation} from "./preparation";
import {from} from "linq-to-typescript";
import {States} from "../../Models/States";

describe('GameServicesService', () => {
  let service: GameService;
  let preparation: Preparation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
    preparation = new Preparation(service, service.aiBattleField);
  });

  it('Генерирует поле полностью по правилам морского боя', () => {
    for (let i = 0; i < 1000; i++) {
      service.aiBattleField.clearMap();
      let arrangement = preparation.setShipsAutomatically();
      let battleShips = from(arrangement).where(x => x.cells.length == 4).toArray();
      let torpedoShips = from(arrangement).where(x => x.cells.length == 3).toArray();
      let destroyerShips = from(arrangement).where(x => x.cells.length == 2).toArray();
      let corvetteShips = from(arrangement).where(x => x.cells.length == 1).toArray();

      expect(battleShips).toHaveSize(1);
      expect(torpedoShips).toHaveSize(2);
      expect(destroyerShips).toHaveSize(3);
      expect(corvetteShips).toHaveSize(4);

      battleShips.forEach(ts => {
        expect(ts.cells.length).toEqual(4);
        ts.cells.forEach(cell => {
          expect(cell.x).toBeGreaterThanOrEqual(0);
          expect(cell.x).toBeLessThanOrEqual(9);
          expect(cell.y).toBeGreaterThanOrEqual(0);
          expect(cell.y).toBeLessThanOrEqual(9);
        })
      });

      torpedoShips.forEach(ts => {
        expect(ts.cells.length).toEqual(3);
        ts.cells.forEach(cell => {
          expect(cell.x).toBeGreaterThanOrEqual(0);
          expect(cell.x).toBeLessThanOrEqual(9);
          expect(cell.y).toBeGreaterThanOrEqual(0);
          expect(cell.y).toBeLessThanOrEqual(9);
        })
      });

      destroyerShips.forEach(ts => {
        expect(ts.cells.length).toEqual(2);
        ts.cells.forEach(cell => {
          expect(cell.x).toBeGreaterThanOrEqual(0);
          expect(cell.x).toBeLessThanOrEqual(9);
          expect(cell.y).toBeGreaterThanOrEqual(0);
          expect(cell.y).toBeLessThanOrEqual(9);
        })
      });

      corvetteShips.forEach(ts => {
        expect(ts.cells.length).toEqual(1);
        ts.cells.forEach(cell => {
          expect(cell.x).toBeGreaterThanOrEqual(0);
          expect(cell.x).toBeLessThanOrEqual(9);
          expect(cell.y).toBeGreaterThanOrEqual(0);
          expect(cell.y).toBeLessThanOrEqual(9);
        })
      });

      let filledCells = from(service.aiBattleField.map)
        .selectMany(row => row)
        .where(cell => cell.state == States.HasShip)
        .toArray();
      expect(filledCells).toHaveSize(20);
    }
  });
});
