import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Certificates1Component } from './certificates1.component';

describe('Certificates1Component', () => {
  let component: Certificates1Component;
  let fixture: ComponentFixture<Certificates1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Certificates1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Certificates1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
