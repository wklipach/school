import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTransferComponent } from './find-transfer.component';

describe('FindTransferComponent', () => {
  let component: FindTransferComponent;
  let fixture: ComponentFixture<FindTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
