import { Component, DoCheck, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';
import { filter } from 'rxjs';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { AuthService } from 'src/app/service/auth.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
interface Product {
  id: number;
  name: string;
  email: string;
  cart?: any[]; // Change from number to any[] to represent an array of cart items
  password: string;
  favorites?: any[]; // Change from string to any[] to represent an array of favorite items
  phoneNumber: string;
  quantity?: number;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    LogoComponent,
  ],
  standalone: true,
})
export class ProductsComponent implements OnInit, DoCheck {
  products: any = [];
  searchTerm: string = '';
  favorites: any[] = []; // Change from [] to any[] for proper typing
  cart: any[] = []; // Change from [] to any[] for proper typing
  userData: Product | undefined;
  category: string = 'all';

  constructor(
    private data: DataService,
    private router: Router,
    private authService: AuthService,
    private showMessage: MessageService,
    private getCategory: AuthServiceService
  ) {
    this.category = this.getCategory.category;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (this.router.url !== '/products') {
          this.getCategory.category = 'all';
        }
      });
  }
  ngOnInit() {
    this.data.getAllData().subscribe((data) => {
      this.products = data;
    });
  }

  get filteredItems(): any {
    let filteredProducts = this.products;
    if (this.searchTerm) {
      filteredProducts = filteredProducts.filter((item: any) =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    if (this.category !== 'all') {
      filteredProducts = filteredProducts.filter((item: any) => {
        return item.category === this.category;
      });
    }

    return filteredProducts;
  }
  ngDoCheck(): void {
    if (this.data.searchResult) {
      this.searchTerm = this.data.searchResult;
      this.data.searchResult = '';
    }
  }
  async addToCart(item: any) {
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
  async addToFavorites(item: any) {
    const user = await this.authService.afAuth.currentUser; // Get the current user
    if (user) {
      const uid = user.uid; // Get the UID from the current user
      try {
        await this.authService.addToFavorites(uid, item); // Call a method to add the favorite
      } catch (error) {
        console.error('Error adding to favorites:', error);
      }
    } else {
      this.showMessage.showError('You Have To login');
    }
  }
  goToProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]); // Anfal
  }
}
