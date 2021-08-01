import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificateComponent } from './notificate.component';

describe('NotificateComponent', () => {
  let component: NotificateComponent;
  let fixture: ComponentFixture<NotificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
