import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart-service.service';

@Component({
  selector: 'app-end-message',
  templateUrl: './end-message.component.html',
  styleUrls: ['./end-message.component.css'],
})
export class EndMessageComponent {
  userData: any = [];
  userCart: any = [];
  subtotal: number = 0;
  couponIsActive: boolean = false;
  BuyForm!: FormGroup;
  totalCartCost = 0;
  constructor(
    private user: AuthService,
    private form: AuthServiceService,
    private CartService: CartService,
    public afAuth: AngularFireAuth
  ) {
    this.BuyForm = this.form.BuyForm || new FormGroup({});
    this.getCartData();

    // this.userData = this.user.getUserData(userId).subscribe((data) => {
    //   this.userData = data;
    //   this.userData.cart.map((e: any) => {
    //     this.subtotal += e.price * e.quantity;
    //   });
    //   this.couponIsActive = this.user.couponIsActive;
    // });
  }
  coupon = ['ahmed', 'fady', 'anfal', 'liza', 'linda', 'hager'];

  async getCartData() {
    try {
      const user = await this.user.afAuth.currentUser; // Await the promise to get the user
      if (user) {
        const userId = user.uid; // Access the user ID
        const data = await this.user.getUserCart(userId); // Assuming this returns a Promise<Cart>
        this.userCart = data?.cart || []; // Use a default empty array if items are undefined

        this.user.getUserData(userId).subscribe((userData) => {
          this.userData = userData;

          // Check if the applied coupon exists in the defined coupons
          this.couponIsActive = this.coupon.includes(
            this.userData.appliedCoupon
          );
          console.log(this.couponIsActive);
          this.getTotal(); // Recalculate total after retrieving cart data
        });
      }
    } catch (error) {
      console.error('Error getting current user:', error);
    }
  }

  getTotal() {
    this.totalCartCost = this.userCart.reduce((total: any, item: any) => {
      return total + (item.price || 0) * (item.quantity || 0); // Calculate total cost
    }, 0);
    if (!this.couponIsActive) {
      this.totalCartCost += 50;
    }
  }
}
