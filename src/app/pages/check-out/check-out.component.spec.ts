import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckOutComponent } from './check-out.component';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

// Mocking the child components
@Component({
  selector: 'app-checkout-one',
  template: '',
})
class MockCheckoutOneComponent {}

@Component({
  selector: 'app-checkout-two',
  template: '',
})
class MockCheckoutTwoComponent {}

@Component({
  selector: 'app-end-message',
  template: '',
})
class MockEndMessageComponent {}

// Mocking AuthServiceService
class MockAuthService {
  isBuy = false;
}

describe('CheckOutComponent', () => {
  let component: CheckOutComponent;
  let fixture: ComponentFixture<CheckOutComponent>;
  let authService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CheckOutComponent,
        MockCheckoutOneComponent,
        MockCheckoutTwoComponent,
        MockEndMessageComponent,
      ],
      imports: [HttpClientTestingModule, MatIconModule],
      providers: [{ provide: AuthServiceService, useClass: MockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckOutComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(
      AuthServiceService
    ) as unknown as MockAuthService;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // Ensure the component is created
  });

  it('should set isBuyMessage to true if userData.isBuy is true', () => {
    authService.isBuy = true; // Simulate that a user made a purchase
    component.ngDoCheck(); // Call ngDoCheck manually to simulate the check
    expect(component.isBuyMessage).toBeTrue(); // Ensure isBuyMessage is updated
  });

  it('should close the end message when close button is clicked', () => {
    component.isBuyMessage = true; // Set isBuyMessage to true initially
    component.close(); // Call the close method
    expect(component.isBuyMessage).toBeFalse(); // Ensure isBuyMessage is set to false
    expect(authService.isBuy).toBeFalse(); // Ensure userData.isBuy is set to false
  });
});
