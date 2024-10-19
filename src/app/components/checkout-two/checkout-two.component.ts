import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart-service.service';

@Component({
  selector: 'app-checkout-two',
  templateUrl: './checkout-two.component.html',
  styleUrls: ['./checkout-two.component.css'],
})
export class CheckoutTwoComponent {
  subtotal: number = 0;
  couponIsActive: boolean = false;
  BuyForm!: FormGroup;

  userCart: any[] = [];
  totalCartCost = 0;
  coupon = ['ahmed', 'fady', 'anfal', 'liza', 'linda', 'hager'];

  constructor(
    private form: AuthServiceService,
    public showMessage: ToastrService,
    private user: AuthService,
    private CartService: CartService
  ) {
    this.getCartData();
    this.CartService.getAppliedCoupon().subscribe((data) => {
      if (data) {
        this.couponIsActive = this.coupon.includes(data);
        if (this.couponIsActive) {
          this.couponIsActive = true;
        }
      }
    });
  }

  async getCartData() {
    try {
      const user = await this.user.afAuth.currentUser; // Await the promise to get the user
      if (user) {
        const userId = user.uid; // Access the user ID
        const data = await this.user.getUserCart(userId); // Assuming this returns a Promise<Cart>
        this.userCart = data?.cart || []; // Use a default empty array if items is undefined
        console.log(this.userCart);

        this.getTotal(); // Recalculate total after retrieving cart data
      }
    } catch (error) {
      console.error('Error getting current user:', error);
    }
  }
  getTotal() {
    this.subtotal = this.userCart.reduce((total, item) => {
      return total + (item.price || 0) * (item.quantity || 0); // Calculate total cost
    }, 0);
  }

  onSubmit() {
    if (this.form.BuyForm.valid) {
      this.form.isBuy = true;
    } else {
      this.showMessage.error('form is Invalid', 'Error');
    }
  }
}
