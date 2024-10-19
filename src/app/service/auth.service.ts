// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import Firestore
import firebase from 'firebase/compat/app'; // Import firebase for compatibility
import 'firebase/compat/firestore'; // Import Firestore for compatibility
import { MessageService } from './message.service';
import { Observable } from 'rxjs';

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
  cart: any[]; // Define the structure of the cart items as needed
}
interface favorites {
  favorites: any[]; // Define the structure of the cart items as needed
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private showMessage: MessageService
  ) {}
  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(
    email: string,
    password: string,
    userData: { name: string; phone: string }
  ) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      // Save additional user info to Firestore
      await this.firestore
        .collection('users')
        .doc(userCredential.user?.uid)
        .set({
          name: userData.name,
          phone: userData.phone,
          email, // Optionally save email as well
        });
      return userCredential;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error; // Rethrow the error for handling in the component
    }
  }
  async getUserCart(uid: string): Promise<Cart | null> {
    const cartDoc = await this.firestore
      .collection('carts')
      .doc(uid)
      .get()
      .toPromise();

    // Check if the cartDoc is defined and exists
    if (cartDoc && cartDoc.exists) {
      return cartDoc.data() as Cart; // Cast data to Cart type
    } else {
      return null; // Return null if the document doesn't exist
    }
  }

  async getUserFavorites(uid: string): Promise<any> {
    // Adjust return type as needed
    const favoritesDoc = await this.firestore
      .collection('favorites')
      .doc(uid)
      .get()
      .toPromise();
    // Check if the favoritesDoc is defined and exists
    if (favoritesDoc && favoritesDoc.exists) {
      return favoritesDoc.data(); // You might want to define a Favorites interface too
    } else {
      return null; // Return null if the document doesn't exist
    }
  }
  async logout() {
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }
  async addToCart(uid: string, product: CartItem) {
    try {
      const cartRef = this.firestore.collection('carts').doc(uid);
      const cartDoc = await cartRef.get().toPromise();

      if (cartDoc && cartDoc.exists) {
        const cartData = cartDoc.data() as Cart;

        if (cartData && cartData.cart) {
          // Check if the product already exists in the cart
          const existingProduct = cartData.cart.find(
            (item) => item.id === product.id
          );

          if (existingProduct) {
            // Show a message indicating that the product is already in the cart
            this.showMessage.showInfo('This item is already in your cart!');
            return; // Exit the function
          } else {
            // If it doesn't exist, add it to the cart
            await cartRef.set(
              {
                cart: firebase.firestore.FieldValue.arrayUnion({
                  ...product,
                  quantity: product.quantity,
                }),
              },
              { merge: true }
            );
            this.showMessage.showSuccess('Product Added To Cart');
          }
        } else {
          // If the cart is empty, create a new cart with the product
          await cartRef.set(
            {
              cart: firebase.firestore.FieldValue.arrayUnion({
                ...product,
                quantity: product.quantity,
              }),
            },
            { merge: true }
          );
          this.showMessage.showSuccess('Product Added To Cart');
        }
      } else {
        // If no cart document exists, create a new cart
        await cartRef.set(
          {
            cart: firebase.firestore.FieldValue.arrayUnion({
              ...product,
              quantity: product.quantity,
            }),
          },
          { merge: true }
        );
        this.showMessage.showSuccess('Product Added To Cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  async addToFavorites(uid: string, product: CartItem) {
    try {
      const favoritesRef = this.firestore.collection('favorites').doc(uid);
      const favoritesDoc = await favoritesRef.get().toPromise();

      if (favoritesDoc && favoritesDoc.exists) {
        const favoritesData = favoritesDoc.data() as favorites;

        if (favoritesData && favoritesData.favorites) {
          // Check if the product already exists in the favorites
          const existingFavorite = favoritesData.favorites.find(
            (item) => item.id === product.id
          );

          if (existingFavorite) {
            // Show a message indicating that the product is already in favorites
            this.showMessage.showInfo(
              'This item is already in your favorites!'
            );
            return; // Exit the function
          } else {
            // If it doesn't exist, add it to favorites
            await favoritesRef.set(
              {
                favorites: firebase.firestore.FieldValue.arrayUnion(product),
              },
              { merge: true }
            );
            this.showMessage.showSuccess('Product added to favorites');
          }
        } else {
          // If favorites is empty, create a new favorites list with the product
          await favoritesRef.set(
            {
              favorites: firebase.firestore.FieldValue.arrayUnion(product),
            },
            { merge: true }
          );
          this.showMessage.showSuccess('Product added to favorites');
        }
      } else {
        // If no favorites document exists, create a new favorites list
        await favoritesRef.set(
          {
            favorites: firebase.firestore.FieldValue.arrayUnion(product),
          },
          { merge: true }
        );
        this.showMessage.showSuccess('Product added to favorites');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }
  async removeFromFavorites(uid: string, productId: string) {
    try {
      const favoritesRef = this.firestore.collection('favorites').doc(uid);
      const favDoc = await favoritesRef.get().toPromise();

      // Check if favDoc exists and is not undefined
      if (favDoc?.exists) {
        const favData = favDoc.data() as favorites;

        // Check if favData is not undefined and has an 'items' array
        if (favData && favData.favorites) {
          const updatedFavorites = favData.favorites.filter(
            (item: any) => item.id !== productId
          );

          // Update the favorites document with the new filtered array
          await favoritesRef.update({ favorites: updatedFavorites });
          this.showMessage.showInfo('Item removed from favorites');
        } else {
          this.showMessage.showInfo('No favorites data found.');
        }
      } else {
        this.showMessage.showInfo('Favorites document does not exist.');
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }
  getUserData(userId: string): Observable<any> {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  saveCart(
    userId: string,
    updatedItem: CartItem,
    userCart: any[]
  ): Observable<void> {
    return new Observable((observer) => {
      const cartRef = this.firestore.collection('carts').doc(userId);

      cartRef
        .get()
        .toPromise()
        .then((cartDoc) => {
          if (cartDoc?.exists) {
            // Safely check if cartDoc exists
            const cartData = cartDoc.data() as Cart;

            // Find the index of the item to update
            const itemIndex = cartData.cart.findIndex(
              (item) => item.id === updatedItem.id
            );

            if (itemIndex > -1) {
              // Update the cart in Firestore
              return cartRef.update({ cart: userCart });
            } else {
              // If the item is not found, add it to the cart
              return cartRef.update({
                cart: firebase.firestore.FieldValue.arrayUnion(userCart),
              });
            }
          } else {
            // If the cart doesn't exist, create a new cart document
            return cartRef.set({
              cart: [userCart],
            });
          }
        })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  deleteCart(userId: string, updatedCartItems: any[]): Observable<void> {
    return new Observable((observer) => {
      this.firestore
        .collection('carts')
        .doc(userId)
        .update({ cart: updatedCartItems })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
