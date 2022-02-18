import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBattleFieldComponentComponent } from './user-battle-field-component.component';

describe('UserBattleFieldComponentComponent', () => {
  let component: UserBattleFieldComponentComponent;
  let fixture: ComponentFixture<UserBattleFieldComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBattleFieldComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBattleFieldComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
