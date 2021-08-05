import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicwordListComponent } from './picword-list.component';

describe('PicwordListComponent', () => {
  let component: PicwordListComponent;
  let fixture: ComponentFixture<PicwordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicwordListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicwordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
