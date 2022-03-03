import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import {Preparation} from "../Logic/AI/preparation";
import {from} from "linq-to-typescript";

describe('GameServicesService', () => {
  let service: GameService;
  let preparation: Preparation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
    preparation = new Preparation(service, service.aiBattleField);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
