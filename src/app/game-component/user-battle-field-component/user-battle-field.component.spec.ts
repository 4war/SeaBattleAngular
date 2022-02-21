import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBattleFieldComponent } from './user-battle-field.component';

describe('UserBattleFieldComponentComponent', () => {
  let component: UserBattleFieldComponent;
  let fixture: ComponentFixture<UserBattleFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBattleFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBattleFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
