import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinMapComponent } from './min-map.component';

describe('MinMapComponent', () => {
  let component: MinMapComponent;
  let fixture: ComponentFixture<MinMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinMapComponent]
    });
    fixture = TestBed.createComponent(MinMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
