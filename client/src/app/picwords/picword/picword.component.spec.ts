import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicwordComponent } from './picword.component';

describe('PicwordComponent', () => {
  let component: PicwordComponent;
  let fixture: ComponentFixture<PicwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicwordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
