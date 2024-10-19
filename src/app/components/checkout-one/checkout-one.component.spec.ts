import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutOneComponent } from './checkout-one.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';

describe('CheckoutOneComponent', () => {
  let component: CheckoutOneComponent;
  let fixture: ComponentFixture<CheckoutOneComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthServiceService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthServiceService', ['BuyForm']);
    await TestBed.configureTestingModule({
      declarations: [CheckoutOneComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: AuthServiceService, useValue: spy }],
    });
    fixture = TestBed.createComponent(CheckoutOneComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(
      AuthServiceService
    ) as jasmine.SpyObj<AuthServiceService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 6 controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('address')).toBeTruthy();
    expect(component.form.contains('apartment')).toBeTruthy();
    expect(component.form.contains('city')).toBeTruthy();
    expect(component.form.contains('phone')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
  });

  it('should make the name control required', () => {
    let control = component.form.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalsy(); // Name is required
  });

  it('should validate name with a minimum length of 3', () => {
    let control = component.form.get('name');
    control?.setValue('Al');
    expect(control?.valid).toBeFalsy(); // Name is too short
    control?.setValue('Alex');
    expect(control?.valid).toBeTruthy(); // Valid name
  });

  it('should validate address with a minimum length of 10', () => {
    let control = component.form.get('address');
    control?.setValue('123 St');
    expect(control?.valid).toBeFalsy(); // Too short address
    control?.setValue('123 Main Street');
    expect(control?.valid).toBeTruthy(); // Valid address
  });

  it('should validate phone number with exactly 11 digits', () => {
    let control = component.form.get('phone');
    control?.setValue('123456'); // Too short
    expect(control?.valid).toBeFalsy();
    control?.setValue('12345678901'); // Valid
    expect(control?.valid).toBeTruthy();
  });

  it('should validate email format', () => {
    let control = component.form.get('email');
    control?.setValue('invalid-email');
    expect(control?.valid).toBeFalsy(); // Invalid email format
    control?.setValue('test@example.com');
    expect(control?.valid).toBeTruthy(); // Valid email
  });

  it('should make the city control required', () => {
    let control = component.form.get('city');
    control?.setValue('');
    expect(control?.valid).toBeFalsy(); // City is required
  });

});
