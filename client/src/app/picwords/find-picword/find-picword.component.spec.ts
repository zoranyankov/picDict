import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPicwordComponent } from './find-picword.component';

describe('FindPicwordComponent', () => {
  let component: FindPicwordComponent;
  let fixture: ComponentFixture<FindPicwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindPicwordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPicwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
