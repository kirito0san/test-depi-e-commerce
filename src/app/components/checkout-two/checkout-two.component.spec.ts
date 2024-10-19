import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutTwoComponent } from './checkout-two.component';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

// Mock AuthServiceService
class AuthServiceMock {
  getUserData = jasmine.createSpy('getUserData').and.returnValue(
    of({
      cart: [
        { title: 'Product 1', price: 100, quantity: 1, image: 'image1.jpg' },
        { title: 'Product 2', price: 150, quantity: 2, image: 'image2.jpg' },
      ],
      couponIsActive: false,
    })
  );

  BuyForm: FormGroup; // Mock BuyForm
  isBuy = false; // Mock isBuy property

  constructor() {
    const fb = new FormBuilder();
    this.BuyForm = fb.group({
      name: [''],
      email: [''],
      address: [''],
      // Add other controls as needed
    });
  }
}

// Mock ToastrService
class ToastrMock {
  error = jasmine.createSpy('error'); // Spy on error method
}

describe('CheckoutTwoComponent', () => {
  let component: CheckoutTwoComponent;
  let fixture: ComponentFixture<CheckoutTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], // Import ReactiveFormsModule for form handling
      declarations: [CheckoutTwoComponent],
      providers: [
        { provide: AuthServiceService, useClass: AuthServiceMock }, // Use the mock AuthService
        { provide: ToastrService, useClass: ToastrMock }, // Use the mock ToastrService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the CheckoutTwoComponent', () => {
    expect(component).toBeTruthy(); // Check if the component is created
  });

  it('should set isBuy to true when form is valid on submit', () => {
    component.BuyForm = new FormBuilder().group({
      // Create a valid form
      name: ['John Doe'],
      email: ['john@example.com'],
      address: ['123 Main St'],
    });

    component.onSubmit(); // Call onSubmit

    const authService = TestBed.inject(AuthServiceService);
    expect(authService.isBuy).toBeTrue(); // Check if isBuy is set to true in the AuthService
  });
});
