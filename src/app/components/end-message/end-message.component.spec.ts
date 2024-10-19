import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndMessageComponent } from './end-message.component';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // To handle HttpClient dependencies
import { of } from 'rxjs';
import { FormGroup } from '@angular/forms';

describe('EndMessageComponent', () => {
  let component: EndMessageComponent;
  let fixture: ComponentFixture<EndMessageComponent>;
  let authService: AuthServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndMessageComponent],
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule to handle HttpClient in services
      providers: [AuthServiceService], // Use the real service
    }).compileComponents();

    fixture = TestBed.createComponent(EndMessageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthServiceService); // Inject the real service
  });

  // Test to check if the component is created successfully
  it('should create the component', () => {
    expect(component).toBeTruthy(); // Check if the component is created
  });

  // Test to check if BuyForm is initialized
  it('should initialize the BuyForm from AuthServiceService', () => {
    expect(component.BuyForm).toBeInstanceOf(FormGroup); // Ensure the form is initialized from the service
  });

  // Test to check if couponIsActive is loaded correctly
  it('should load couponIsActive state correctly', () => {
    expect(component.couponIsActive).toBe(authService.couponIsActive); // Ensure couponIsActive is loaded correctly
  });
});
