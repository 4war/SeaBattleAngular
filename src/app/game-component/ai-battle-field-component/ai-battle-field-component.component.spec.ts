import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiBattleFieldComponentComponent } from './ai-battle-field-component.component';

describe('AiBattleFieldComponentComponent', () => {
  let component: AiBattleFieldComponentComponent;
  let fixture: ComponentFixture<AiBattleFieldComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiBattleFieldComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiBattleFieldComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
