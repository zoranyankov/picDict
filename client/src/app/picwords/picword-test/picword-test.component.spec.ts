import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicwordTestComponent } from './picword-test.component';

describe('PicwordTestComponent', () => {
  let component: PicwordTestComponent;
  let fixture: ComponentFixture<PicwordTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicwordTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicwordTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
