import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import { ToastrService } from 'ngx-toastr';

describe('MessageService', () => {
  let service: MessageService;
  let toastrServiceMock: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    // Create a spy object for ToastrService
    toastrServiceMock = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
      'warning',
      'info',
    ]);

    TestBed.configureTestingModule({
      providers: [
        MessageService,
        { provide: ToastrService, useValue: toastrServiceMock }, // Provide the mock ToastrService
      ],
    });

    service = TestBed.inject(MessageService); // Inject the MessageService
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Test if the MessageService is created successfully
  });

  it('should show success message', () => {
    const message = 'Operation completed successfully';
    service.showSuccess(message);
    expect(toastrServiceMock.success).toHaveBeenCalledWith(message, 'Success'); // Check if success was called with correct parameters
  });

  it('should show error message', () => {
    const message = 'There was an error';
    service.showError(message);
    expect(toastrServiceMock.error).toHaveBeenCalledWith(message, 'Error'); // Check if error was called with correct parameters
  });

  it('should show warning message', () => {
    const message = 'This is a warning';
    service.showWarning(message);
    expect(toastrServiceMock.warning).toHaveBeenCalledWith(message, 'warning'); // Check if warning was called with correct parameters
  });

  it('should show info message', () => {
    const message = 'This is some information';
    service.showInfo(message);
    expect(toastrServiceMock.info).toHaveBeenCalledWith(message, 'Info'); // Check if info was called with correct parameters
  });
});
