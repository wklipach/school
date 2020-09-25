import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainschoolComponent } from './mainschool.component';

describe('MainschoolComponent', () => {
  let component: MainschoolComponent;
  let fixture: ComponentFixture<MainschoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainschoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
