import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from 'src/app/service/message.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  standalone: true,
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  cart: any[] = [];
  constructor(
    // private userData: AuthServiceService,
    private showMessage: MessageService,
    private router: Router,
    private authService: AuthService
  ) {}
  async ngOnInit() {
    const user = await this.authService.afAuth.currentUser; // Get the current user

    if (user) {
      const uid = user.uid; // Get the UID from the current user
      const cart = await this.authService.getUserCart(uid); // Fetch the user's cart
      const favorites = await this.authService.getUserFavorites(uid); // Fetch the user's favorites
      if (cart) {
        this.cart = cart.cart || []; // Ensure items is an array
      } else {
        this.cart = []; // Default to empty array if cart is null
      }
      if (favorites) {
        this.favorites = favorites.favorites || []; // Ensure items is an array
      } else {
        this.favorites = []; // Default to empty array if favorites is null
      }
    }
  }
  async AddToCart(item: any) {
    const user = await this.authService.afAuth.currentUser;
    item.quantity = 1; // Get the current user
    console.log(user);
    if (
      !item ||
      !item.id ||
      !item.title ||
      item.price === undefined ||
      item.quantity === undefined
    ) {
      console.error('Product data is incomplete:', item);
      return; // Exit the function if the product is incomplete
    }
    if (user) {
      const uid = user.uid; // Get the UID from the current user
      try {
        await this.authService.addToCart(uid, item); // Call the method to add to cart
        console.log('Added to cart:', item);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      this.showMessage.showError('You Have To Login');
      console.warn('User not logged in');
    }
  }
  async deleteFavorites(id: any) {
    const user = await this.authService.afAuth.currentUser;
    if (user) {
      try {
        await this.authService.removeFromFavorites(user.uid, id);
        // Remove the item from the local 'favorites' array to update the UI instantly
        this.favorites = this.favorites.filter((item: any) => item.id !== id);
      } catch (error) {}
    }
  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]); // Anfal
  }
}
