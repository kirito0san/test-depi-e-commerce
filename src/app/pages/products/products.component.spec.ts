import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsComponent } from './products.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'src/app/service/message.service';

// Mock Router for navigation
class RouterMock {
  navigate = jasmine.createSpy('navigate'); // Mock the navigate method
}

// Mock DataService to return test data
class DataServiceMock {
  getAllData() {
    return of([
      {
        id: 1,
        title: 'Product 1',
        price: 100,
        image: 'image1.jpg',
        category: 'electronics',
      },
      {
        id: 2,
        title: 'Product 2',
        price: 150,
        image: 'image2.jpg',
        category: 'jewelery',
      },
      {
        id: 3,
        title: 'Product 3',
        price: 200,
        image: 'image3.jpg',
        category: "men's clothing",
      },
    ]);
  }
}

// Mock AuthServiceService to control login state
class AuthServiceMock {
  logIn = true; // Simulate that user is logged in
  category = 'all'; // Default category
  getUserData(user: any) {
    return of({
      id: user,
      favorites: [],
      cart: [],
    });
  }
}

// Mock MessageService to prevent actual Toastr calls
