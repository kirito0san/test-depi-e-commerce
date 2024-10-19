import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from './slider.component'; // Import the standalone SliderComponent
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

// Mock Router for navigation
class RouterMock {
  navigate = jasmine.createSpy('navigate'); // Mock the navigate method
}

// Mock AuthServiceService to control category setting
class AuthServiceMock {
  category = ''; // Initialize as empty string
}

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule, // Required for ngIf, ngFor, etc.
        NgbCarouselModule, // Import the NgbCarouselModule for the carousel
        SliderComponent, // Import the standalone SliderComponent
      ],
      providers: [
        { provide: Router, useClass: RouterMock }, // Provide the mock Router
        { provide: AuthServiceService, useClass: AuthServiceMock }, // Provide the mock AuthService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the SliderComponent', () => {
    expect(component).toBeTruthy(); // Check if the component is created
  });

  it('should initialize image chunks on ngOnInit', () => {
    component.ngOnInit(); // Call ngOnInit to initialize the component
    expect(component.imageChunks.length).toBeGreaterThan(0); // Ensure image chunks are initialized
  });

  it('should navigate to products on image click', () => {
    const place = 'electronics'; // Example place to click on
    component.onClick(place); // Simulate a click on an image

    // Check if navigation is called with the correct route
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should correctly chunk images based on screen width', () => {
    // Simulate different screen widths
    window.innerWidth = 800; // Set width greater than 768px
    component.updateImageChunks();
    expect(component.imageChunks.length).toBe(4); // Should have 4 chunks with 3 images each

    window.innerWidth = 600; // Set width less than or equal to 768px
    component.updateImageChunks();
    expect(component.imageChunks.length).toBe(6); // Should have 6 chunks with 2 images each

    window.innerWidth = 400; // Set width less than or equal to 576px
    component.updateImageChunks();
    expect(component.imageChunks.length).toBe(12); // Should have 12 chunks with 1 image each
  });

  it('should call carousel next method', () => {
    spyOn(component.carousel, 'next'); // Spy on the next method of the carousel
    component.next(); // Call next method
    expect(component.carousel.next).toHaveBeenCalled(); // Check if next was called
  });

  it('should call carousel prev method', () => {
    spyOn(component.carousel, 'prev'); // Spy on the prev method of the carousel
    component.prev(); // Call prev method
    expect(component.carousel.prev).toHaveBeenCalled(); // Check if prev was called
  });
});
