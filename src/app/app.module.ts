import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CartComponent } from './pages/cart/cart.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './pages/products/products.component';
import { MatIconModule } from '@angular/material/icon';
import { NewArrivalComponent } from './components/new-arrival/new-arrival.component';
import { ProductComponent } from './pages/product/product.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { MinMapComponent } from './components/min-map/min-map.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { CheckoutOneComponent } from './components/checkout-one/checkout-one.component';
import { CheckoutTwoComponent } from './components/checkout-two/checkout-two.component';
import { SliderComponent } from './components/slider/slider.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { EndMessageComponent } from './components/end-message/end-message.component';
import { LogoComponent } from './components/logo/logo.component';
import { PersonalizedGiftComponent } from './components/personalized-gift/personalized-gift.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Updated import
import { firebaseConfig } from '../environments/environment'; // Adjust the path if necessary

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    NewArrivalComponent,
    ProductComponent,
    ErrorComponent,
    MinMapComponent,
    CheckOutComponent,
    CheckoutOneComponent,
    CheckoutTwoComponent,
    EndMessageComponent,
    PersonalizedGiftComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    LogoComponent,
    SliderComponent,
    FavoritesComponent,
    HeaderComponent,
    CartComponent,
    FooterComponent,
    HeaderComponent,
    BrowserModule,
    AppRoutingModule,
    CartComponent,
    SignupComponent,
    NgbModule,
    LoginComponent,
    BrowserAnimationsModule,
    HttpClientModule,
    ProductsComponent,
    MatIconModule,
    FooterComponent,
    TestimonialsComponent,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
