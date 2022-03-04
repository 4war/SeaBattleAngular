import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiStateComponent } from './ai-state.component';

describe('AiStateComponentComponent', () => {
  let component: AiStateComponent;
  let fixture: ComponentFixture<AiStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
