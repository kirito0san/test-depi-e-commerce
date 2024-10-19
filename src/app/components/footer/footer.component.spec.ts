import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FooterComponent } from './footer.component';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // For mocking observables

class MockToastrService {
  error(message: string) {}
}

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let toastrService: MockToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, FormsModule, RouterLink],
      providers: [
        { provide: ToastrService, useClass: MockToastrService },
        { provide: ActivatedRoute, useValue: { params: of({}) } }, // Mock ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should set current year correctly', () => {
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toBe(currentYear);
  });
  it('should show error message when email is not provided', () => {
    spyOn(toastrService, 'error');
    component.email = '';
    component.sendEmail();
    expect(toastrService.error).toHaveBeenCalledWith('Inter Your Email');
  });
});
