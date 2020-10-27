import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultV1Component } from './result-v1.component';

describe('ResultV1Component', () => {
  let component: ResultV1Component;
  let fixture: ComponentFixture<ResultV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultV1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
