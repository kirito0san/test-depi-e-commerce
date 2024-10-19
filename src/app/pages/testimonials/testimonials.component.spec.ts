import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsComponent } from './testimonials.component';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TestimonialsComponent', () => {
  let component: TestimonialsComponent;
  let fixture: ComponentFixture<TestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [TestimonialsComponent]
      imports: [
        RouterTestingModule,
        CommonModule,
        RouterLink,
        LogoComponent,
        TestimonialsComponent
      ],
    });
    fixture = TestBed.createComponent(TestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have testimonials defined', () => {
    expect(component.testimonials).toBeDefined();
    expect(component.testimonials.length).toBeGreaterThan(0);
  });

  it('should render testimonials in the template', () => {
    const compiled = fixture.nativeElement; // Get the compiled DOM
    const testimonialElements = compiled.querySelectorAll('.testimonial'); // Assuming you have a class 'testimonial' for each testimonial
    expect(testimonialElements.length).toBe(component.testimonials.length); // Check if the number of elements matches the number of testimonials
  });

  // Optionally test if specific testimonial content is rendered correctly
  it('should display the correct title and name for the first testimonial', () => {
    const compiled = fixture.nativeElement;
    // Ensure change detection is triggered after the initial creation
    fixture.detectChanges();

    const firstTestimonial = component.testimonials[0];
    const titleElement = compiled.querySelector('.card-title'); // Replace with your actual selector
    const nameElement = compiled.querySelector('h5.mb-0'); // Replace with your actual selector

    expect(titleElement).toBeTruthy(); // Check if titleElement is not null
    expect(nameElement).toBeTruthy(); // Check if nameElement is not null

    if (titleElement && nameElement) {
      expect(titleElement.textContent).toContain(firstTestimonial.title);
      expect(nameElement.textContent).toContain(firstTestimonial.name);
    }
  });
});
