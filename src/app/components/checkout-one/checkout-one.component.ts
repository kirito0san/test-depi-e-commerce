import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-checkout-one',
  templateUrl: './checkout-one.component.html',
  styleUrls: ['./checkout-one.component.css'],
})
export class CheckoutOneComponent {
  form: FormGroup;
  cities = ['Cairo', 'Giza', 'Beni-suif', 'Alexandria', 'Luxor', 'Aswan'];
  constructor(private userData: AuthServiceService) {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z ]+'), // Only letters and spaces
        Validators.minLength(3),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      apartment: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{11}$'), // Exactly 10 digits
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.userData.BuyForm = this.form;
  }
}
