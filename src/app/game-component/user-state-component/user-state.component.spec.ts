import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStateComponent } from './user-state.component';

describe('UserStateComponentComponent', () => {
  let component: UserStateComponent;
  let fixture: ComponentFixture<UserStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
