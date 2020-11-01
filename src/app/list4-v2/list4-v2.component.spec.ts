import { ComponentFixture, TestBed } from '@angular/core/testing';

import { List4V2Component } from './list4-v2.component';

describe('List4V2Component', () => {
  let component: List4V2Component;
  let fixture: ComponentFixture<List4V2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ List4V2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(List4V2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
