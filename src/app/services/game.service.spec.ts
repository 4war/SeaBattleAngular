import { TestBed } from '@angular/core/testing';

import { gameService } from './game.service';

describe('GameServicesService', () => {
  let service: gameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(gameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
