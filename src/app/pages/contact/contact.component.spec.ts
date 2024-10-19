import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactComponent } from './contact.component';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { MinMapComponent } from 'src/app/components/min-map/min-map.component';
// Adjust the path as needed

// Mock ToastrService
class MockToastrService {
  error(message: string) {}
}

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let toastrService: MockToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, LogoComponent], // Import FormsModule and both standalone components
      declarations: [ContactComponent, MinMapComponent],
      providers: [{ provide: ToastrService, useClass: MockToastrService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the ContactComponent', () => {
    expect(component).toBeTruthy(); // Verify the component is created
  });

  it('should show an error message when the email field is empty', () => {
    spyOn(toastrService, 'error');
    component.email = ''; // Empty email
    component.sendEmail(); // Call the method to send an email

    // Ensure the error message is shown via Toastr
    expect(toastrService.error).toHaveBeenCalledWith('Inter Your Email');
  });
});
