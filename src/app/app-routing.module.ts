import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductComponent } from './pages/product/product.component';
import { ErrorComponent } from './pages/error/error.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((m) => {
        return m.SignupComponent;
      }),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => {
        return m.LoginComponent;
      }),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products.component').then((m) => {
        return m.ProductsComponent;
      }),
  },
  {
    path: 'Testimonials',
    loadComponent: () =>
      import('./pages/testimonials/testimonials.component').then((m) => {
        return m.TestimonialsComponent;
      }),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart.component').then((m) => {
        return m.CartComponent;
      }),
    canActivate: [authGuard],
  },
  {
    path: 'Favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.component').then((m) => {
        return m.FavoritesComponent;
      }),
    canActivate: [authGuard],
  },

  { path: 'About', component: AboutComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'product/:id', component: ProductComponent },

  { path: 'CheckOut', component: CheckOutComponent, canActivate: [authGuard] },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
