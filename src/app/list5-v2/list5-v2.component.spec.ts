import { ComponentFixture, TestBed } from '@angular/core/testing';

import { List5V2Component } from './list5-v2.component';

describe('List5V2Component', () => {
  let component: List5V2Component;
  let fixture: ComponentFixture<List5V2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ List5V2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(List5V2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
