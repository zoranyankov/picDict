import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePicwordComponent } from './create-picword.component';

describe('CreatePicwordComponent', () => {
  let component: CreatePicwordComponent;
  let fixture: ComponentFixture<CreatePicwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePicwordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePicwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
