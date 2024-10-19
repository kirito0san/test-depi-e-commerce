import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import Firestore
import { EMPTY, from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app'; // Import firebase for compatibility
import { AngularFireAuth } from '@angular/fire/compat/auth';
interface UserData {
  appliedCoupon?: string;
}
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {}

  getCart(): Observable<any[]> {
    return from(this.afAuth.currentUser).pipe(
      switchMap((user: any) => {
        if (user) {
          return this.firestore
            .collection('carts')
            .doc(user.uid)
            .valueChanges()
            .pipe(map((cartData: any) => cartData?.cart || []));
        } else {
          return of([]); // Return an empty array if no user is found
        }
      })
    );
  }

  addToCart(cartItem: any): Observable<void> {
    return from(this.afAuth.currentUser).pipe(
      switchMap((user) => {
        if (user) {
          const userId = user.uid; // Get the UID of the current user
          return new Observable<void>((observer) => {
            this.firestore
              .collection('carts')
              .doc(userId)
              .update({
                cart: firebase.firestore.FieldValue.arrayUnion(cartItem),
              })
              .then(() => {
                observer.next();
                observer.complete();
              })
              .catch((error) => {
                observer.error(error);
              });
          });
        } else {
          return new Observable<void>((observer) => {
            observer.error('User not authenticated');
            observer.complete();
          });
        }
      })
    );
  }
  updateCart(updatedItem: any): Observable<void> {
    return from(this.afAuth.currentUser).pipe(
      switchMap((user) => {
        if (user) {
          const userId = user.uid; // Get the UID of the current user
          return new Observable<void>((observer) => {
            this.firestore
              .collection('carts')
              .doc(userId)
              .get()
              .subscribe((doc) => {
                if (doc.exists) {
                  const cartData = doc.data() as any;
                  const updatedCart = cartData.cart.map((item: any) =>
                    item.id === updatedItem.id ? updatedItem : item
                  );

                  this.firestore
                    .collection('carts')
                    .doc(userId)
                    .update({ cart: updatedCart })
                    .then(() => {
                      observer.next();
                      observer.complete();
                    })
                    .catch((error) => {
                      observer.error(error);
                    });
                } else {
                  observer.error('Cart not found');
                }
              });
          });
        } else {
          return new Observable<void>((observer) => {
            observer.error('User not authenticated');
            observer.complete();
          });
        }
      })
    );
  }

  saveCouponToUser(couponCode: string): Observable<void> {
    return from(this.afAuth.currentUser).pipe(
      switchMap((user) => {
        if (user) {
          return from(
            this.firestore.collection('users').doc(user.uid).update({
              appliedCoupon: couponCode,
            })
          );
        } else {
          return EMPTY; // Return an empty observable instead of null
        }
      })
    );
  }

  getAppliedCoupon(): Observable<string | null> {
    return from(this.afAuth.currentUser).pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore
            .collection('users')
            .doc(user.uid)
            .get()
            .pipe(
              map((doc) => {
                const userData = doc.data() as UserData; // Cast the document data to UserData type
                return userData?.appliedCoupon ?? null; // Return appliedCoupon if it exists, else return null
              })
            );
        } else {
          return of(null); // Return null if the user is not logged in
        }
      })
    );
  }
}
