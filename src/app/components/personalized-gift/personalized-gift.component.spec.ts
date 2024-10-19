import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizedGiftComponent } from './personalized-gift.component';

describe('PersonalizedGiftComponent', () => {
  let component: PersonalizedGiftComponent;
  let fixture: ComponentFixture<PersonalizedGiftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalizedGiftComponent]
    });
    fixture = TestBed.createComponent(PersonalizedGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
