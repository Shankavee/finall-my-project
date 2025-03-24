import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveLearningContentComponent } from './interactive-learning-content.component';

describe('InteractiveLearningContentComponent', () => {
  let component: InteractiveLearningContentComponent;
  let fixture: ComponentFixture<InteractiveLearningContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InteractiveLearningContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveLearningContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
