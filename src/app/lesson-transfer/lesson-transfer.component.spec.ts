import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonTransferComponent } from './lesson-transfer.component';

describe('LessonTransferComponent', () => {
  let component: LessonTransferComponent;
  let fixture: ComponentFixture<LessonTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
