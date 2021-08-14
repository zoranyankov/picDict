import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePicwordsComponent } from './profile-picwords.component';

describe('ProfilePicwordsComponent', () => {
  let component: ProfilePicwordsComponent;
  let fixture: ComponentFixture<ProfilePicwordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePicwordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePicwordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
