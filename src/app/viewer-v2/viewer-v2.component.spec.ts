import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerV2Component } from './viewer-v2.component';

describe('ViewerV2Component', () => {
  let component: ViewerV2Component;
  let fixture: ComponentFixture<ViewerV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewerV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
