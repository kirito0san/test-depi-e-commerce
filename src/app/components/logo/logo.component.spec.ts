import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;
  let logoElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent], // Import the standalone LogoComponent directly
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger Angular's change detection

    // Get the <img> element
    logoElement = fixture.debugElement.query(By.css('img'));
  });

  it('should create the logo component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo image with the correct src and alt attributes', () => {
    expect(logoElement).toBeTruthy(); // Ensure the <img> exists
    expect(logoElement.nativeElement.src).toContain('assets/Bear-logo.webp'); // Check the src attribute
    expect(logoElement.nativeElement.alt).toBe('logo img'); // Check the alt attribute is empty
  });
});
