import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiBattleFieldComponent } from './ai-battle-field.component';

describe('AiBattleFieldComponentComponent', () => {
  let component: AiBattleFieldComponent;
  let fixture: ComponentFixture<AiBattleFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiBattleFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiBattleFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
