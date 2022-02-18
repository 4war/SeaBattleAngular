import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiStateComponentComponent } from './ai-state-component.component';

describe('AiStateComponentComponent', () => {
  let component: AiStateComponentComponent;
  let fixture: ComponentFixture<AiStateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiStateComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiStateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
