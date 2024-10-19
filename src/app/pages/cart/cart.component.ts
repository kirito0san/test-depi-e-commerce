import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf
import { RouterLink } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HtmlTagDefinition } from '@angular/compiler';
import { CartService } from 'src/app/service/cart-service.service';
interface CartItem {
  id?: number | null | undefined;
  category?: string | null | undefined;
  title?: string | null | undefined;
  description?: string | null | undefined;
  price?: number | null | undefined;
  image?: string | null;
  rating?:
    | {
        rate?: number | null | undefined;
        count?: number | null | undefined;
      }
    | null
    | undefined;
  quantity?: any;
}
interface Cart {
  items: any[]; // Define the structure of the cart items as needed
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [MatCardModule, MatButtonModule, CommonModule, RouterLink],
  standalone: true,
})
export class CartComponent {
  cart!: any[];
  totalCartCost = 0;
  userId = 0;
  coupon = ['ahmed', 'fady', 'anfal', 'liza', 'linda', 'hager'];
  couponIsActive = false;
  userCart: any[] = [];
  getAppliedCoupon: string = '';
  constructor(
    private showMessage: MessageService,
    private user: AuthService,
    private CartService: CartService
  ) {
    this.getCartData();
    this.CartService.getAppliedCoupon().subscribe((data) => {
      if (data) {
        this.couponIsActive = this.coupon.includes(data);
        this.getAppliedCoupon = data;
        if (this.couponIsActive) {
          this.couponIsActive = true;
          this.showMessage.showInfo('Your Shipping On Us 😉');
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
        this.getTotal(); // Recalculate total after retrieving cart data
      } else {
        this.showMessage.showError('Please log in to view your cart.'); // Notify the user they need to log in
      }
    } catch (error) {
      console.error('Error getting current user:', error);
      this.showMessage.showError('Failed to get user data.'); // Handle any errors
    }
  }
  async deleteCart(id: number) {
    try {
      const user = await this.user.afAuth.currentUser; // Await the promise to get the user
      if (user) {
        const userId = user.uid; // Access the user ID
        this.userCart = this.userCart.filter((item) => item.id !== id); // Filter out the deleted item
        await this.user.deleteCart(userId, this.userCart).toPromise(); // Use toPromise() to wait for the observable to complete
        this.getTotal(); // Recalculate total after deleting an item
      } else {
        this.showMessage.showError(
          'Unable to delete cart item. User is not logged in.'
        );
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
      this.showMessage.showError('Failed to delete cart item.'); // Handle any errors
    }
  }
  async getUserId(): Promise<string | null> {
    const user = await this.user.afAuth.currentUser; // Await the promise to get the user
    return user ? user.uid : null; // Return user ID if user exists
  }
  async quantity(event: any, item: CartItem) {
    const newQuantity = event.value; // Get the new quantity from the event
    if (newQuantity >= 1) {
      console.log(1);
      const itemIndex = this.userCart.findIndex((i) => i.id === item.id);
      this.userCart[itemIndex].quantity = newQuantity;

      const userId = await this.getUserId(); // Await the user ID retrieval
      if (userId) {
        this.user.saveCart(userId, item, this.userCart).subscribe(
          () => {
            this.getTotal(); // Recalculate total after updating
            this.showMessage.showSuccess('Product updated successfully!'); // Show success message
          },
          (error) => {
            console.error('Error updating product:', error);
            this.showMessage.showError('Failed to update product in cart.'); // Show error message
          }
        );
      }
    } else {
      this.deleteCart(item.id!); // Delete item if quantity is less than 1
    }
  }

  activeCoupon(coupon: HTMLInputElement) {
    this.getAppliedCoupon = coupon.value;
    this.couponIsActive = this.coupon.includes(coupon.value);
    this.CartService.saveCouponToUser(coupon.value).subscribe();
    if (this.couponIsActive) {
      this.showMessage.showSuccess('Shipping On Us 😉');
    } else {
      this.showMessage.showError('Invalid coupon code');
    }
  }

  getTotal() {
    this.totalCartCost = this.userCart.reduce((total, item) => {
      return total + (item.price || 0) * (item.quantity || 0); // Calculate total cost
    }, 0);
  }
}
