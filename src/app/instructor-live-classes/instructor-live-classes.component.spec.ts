import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorLiveClassesComponent } from './instructor-live-classes.component';

describe('InstructorLiveClassesComponent', () => {
  let component: InstructorLiveClassesComponent;
  let fixture: ComponentFixture<InstructorLiveClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorLiveClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorLiveClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
