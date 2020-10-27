import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultV2Component } from './result-v2.component';

describe('ResultV2Component', () => {
  let component: ResultV2Component;
  let fixture: ComponentFixture<ResultV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
