import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart-service.service';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'src/app/service/message.service';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import Firestore
import firebase from 'firebase/compat/app'; // Import firebase for compatibility

interface Product {
  id?: number | null | undefined;
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
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  productDetails!: Product;
  currentUserId: string | null = null; // Store the current user's ID

  isFavorites: boolean = false;
  cart!: any[];
  userCart!: any[];
  userId = 0;

  favorites: any[] = [];

  quantity: number = 1;
  constructor(
    // private userData: AuthServiceService,
    private firestore: AngularFirestore,
    private cartService: CartService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private showMessage: MessageService,
    private afAuth: AngularFireAuth
  ) {
    this.checkIfFavorite(); // Check if the product is in favorites when the page loads
    const productId = this.route.snapshot.paramMap.get('id');
    this.dataService.getAllData().subscribe((data) => {
      this.cart = data || [];
      this.productDetails = data.find((p: any) => p.id == productId);
    });
  }
  async checkIfFavorite() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.currentUserId = user.uid;
      this.firestore
        .collection('favorites')
        .doc(user.uid)
        .valueChanges()
        .subscribe((favoritesData: any) => {
          if (favoritesData && favoritesData.favorites) {
            // Check if the product is already in the user's favorites
            this.isFavorites = favoritesData.favorites.some(
              (item: any) => item.id === this.productDetails.id
            );
          }
        });
    }
  }

  addToFavorites() {
    if (this.currentUserId) {
      const favoriteItem = {
        id: this.productDetails.id,
        ...this.productDetails,
      };

      // Add the product to the favorites in Firebase
      this.firestore
        .collection('favorites')
        .doc(this.currentUserId)
        .update({
          favorites: firebase.firestore.FieldValue.arrayUnion(favoriteItem),
        })
        .then(() => {
          this.isFavorites = true; // Set the state to true
          this.showMessage.showSuccess('Product added to favorites');
        })
        .catch((error) => {
          console.error('Error adding to favorites: ', error);
        });
    }
  }
  removeFromFavorites() {
    if (this.currentUserId) {
      const favoriteItem = {
        id: this.productDetails.id,
        ...this.productDetails,
      };
      // Remove the product from the favorites in Firebase
      this.firestore
        .collection('favorites')
        .doc(this.currentUserId)
        .update({
          favorites: firebase.firestore.FieldValue.arrayRemove(favoriteItem),
        })
        .then(() => {
          this.isFavorites = false; // Set the state to false
          this.showMessage.showInfo('Item removed from favorites');
        })
        .catch((error) => {
          console.error('Error removing from favorites: ', error);
        });
    }
  }
  // Handiling Rating Stars
  getFullStars(rate: number) {
    return Math.floor(rate); // For full stars
  }

  hasHalfStar(rate: number) {
    //return rate % 1 >= 0.5;  // Check for half star
    return rate % 1 > 0 && rate % 1 <= 0.9;
  }
  getEmptyStars(rate: number) {
    return 5 - Math.ceil(rate); // For empty stars
  }
  buyNow() {
    // Use `first()` to take only the first emitted value and complete the subscription
    this.cartService
      .getCart()
      .pipe(first())
      .subscribe(
        (data) => {
          const userCart = data; // Use a local variable for cart data
          // Find the product in the cart
          const existingItem = userCart.find(
            (item) => item.id === this.productDetails.id
          );

          if (existingItem) {
            // If the item exists, increase the quantity
            const updatedQuantity = existingItem.quantity + this.quantity; // Ensure you're adding to the existing quantity
            const updatedItem = { ...existingItem, quantity: updatedQuantity }; // Create a new object for immutability
            this.cartService
              .updateCart(updatedItem)
              .pipe(first())
              .subscribe(
                () => {
                  this.showMessage.showSuccess('Quantity updated in cart');
                },
                (error) => {
                  this.showMessage.showError('Error updating cart');
                }
              );
          } else {
            // If the item doesn't exist, add it to the cart
            const cartItem = {
              id: this.productDetails.id,
              quantity: this.quantity,
              ...this.productDetails,
            };

            this.cartService
              .addToCart(cartItem)
              .pipe(first())
              .subscribe(
                () => {
                  this.showMessage.showSuccess('Product added to cart');
                },
                (error) => {
                  this.showMessage.showError(
                    'Please log in first to add to cart'
                  );
                }
              );
          }
        },
        (error) => {
          this.showMessage.showError('Error in site');
        }
      );
  }

  increase(item: any) {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  async toggleFavorite() {
    const user = await this.afAuth.currentUser;
    if (!user) {
      this.showMessage.showError('Please log in first to add to favorites.');
      return;
    }

    this.currentUserId = user.uid;
    if (this.isFavorites) {
      this.removeFromFavorites();
    } else {
      this.addToFavorites();
    }
  }
}
