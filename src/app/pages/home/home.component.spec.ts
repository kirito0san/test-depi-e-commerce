import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { HomeComponent } from './home.component';
import { LogoComponent } from 'src/app/components/logo/logo.component'; // Import the standalone LogoComponent
import { PersonalizedGiftComponent } from 'src/app/components/personalized-gift/personalized-gift.component'; // Import the non-standalone component
import { SliderComponent } from 'src/app/components/slider/slider.component'; // Import the standalone SliderComponent
import { NewArrivalComponent } from 'src/app/components/new-arrival/new-arrival.component'; // Import the non-standalone component
import { CommonModule } from '@angular/common'; // Import CommonModule for structural directives

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule, // Required for ngIf, ngFor, etc.
        HttpClientTestingModule, // Import HttpClientTestingModule
        LogoComponent, // Import the standalone LogoComponent
        SliderComponent, // Import the standalone SliderComponent
      ],
      declarations: [
        HomeComponent,
        PersonalizedGiftComponent, // Declare the non-standalone component
        NewArrivalComponent, // Declare the non-standalone component
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the HomeComponent', () => {
    expect(component).toBeTruthy(); // Check if the component is created
  });

  it('should render the logo component', () => {
    const logoElement =
      fixture.debugElement.nativeElement.querySelector('app-logo');
    expect(logoElement).toBeTruthy(); // Check if app-logo is present
  });

  it('should render the personalized gift component', () => {
    const personalizedGiftElement =
      fixture.debugElement.nativeElement.querySelector('app-personalized-gift');
    expect(personalizedGiftElement).toBeTruthy(); // Check if app-personalized-gift is present
  });

  it('should render the slider component', () => {
    const sliderElement =
      fixture.debugElement.nativeElement.querySelector('app-slider');
    expect(sliderElement).toBeTruthy(); // Check if app-slider is present
  });

  it('should render the new arrival component', () => {
    const newArrivalElement =
      fixture.debugElement.nativeElement.querySelector('app-new-arrival');
    expect(newArrivalElement).toBeTruthy(); // Check if app-new-arrival is present
  });
});
