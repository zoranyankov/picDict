import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPicwordComponent } from './edit-picword.component';

describe('EditPicwordComponent', () => {
  let component: EditPicwordComponent;
  let fixture: ComponentFixture<EditPicwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPicwordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPicwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
