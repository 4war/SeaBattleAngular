import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStateComponentComponent } from './user-state-component.component';

describe('UserStateComponentComponent', () => {
  let component: UserStateComponentComponent;
  let fixture: ComponentFixture<UserStateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStateComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
