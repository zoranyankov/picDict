import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicwordDetailsComponent } from './picword-details.component';

describe('PicwordDetailsComponent', () => {
  let component: PicwordDetailsComponent;
  let fixture: ComponentFixture<PicwordDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicwordDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicwordDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
