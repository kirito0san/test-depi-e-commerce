import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';

describe('AuthServiceService', () => {
  let service: AuthServiceService;
  let httpMock: HttpTestingController;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']); // Mock Router

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for mocking HTTP requests
      providers: [
        AuthServiceService,
        { provide: Router, useValue: routerMock }, // Provide the mocked Router
      ],
    });

    service = TestBed.inject(AuthServiceService); // Inject AuthServiceService
    httpMock = TestBed.inject(HttpTestingController); // Inject HttpTestingController
  });

  afterEach(() => {
    httpMock.verify(); // Verify there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Test if the service is created successfully
  });

  it('should log in a user', () => {
    // Mock user data for login
    const mockResponse = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      },
    ];

    // Call the login method
    service.login().subscribe((data) => {
      expect(data).toEqual(mockResponse); // Check that the data returned is correct
      expect(service.logIn).toBeTrue(); // Ensure logIn is set to true
    });

    // Expect the request to be made to the correct URL
    const req = httpMock.expectOne(service.getApiUrl()); // Change this URL if needed
    expect(req.request.method).toBe('GET'); // Ensure it's a GET request
    req.flush(mockResponse); // Simulate returning the mock data
  });

  it('should register a user', () => {
    const userData = {
      name: 'John',
      email: 'john@example.com',
      password: 'password',
      phoneNumber: '1234567890',
    };
    const mockResponse = { success: true };

    service.register(userData).subscribe((response) => {
      expect(response).toEqual(mockResponse); // Check that the registration response is correct
    });

    const req = httpMock.expectOne(service.getApiUrl()); // Expect a POST request to the API URL
    expect(req.request.method).toBe('POST'); // Ensure it's a POST request
    req.flush(mockResponse); // Simulate returning the mock response
  });

  it('should save favorites', () => {
    const userId = 1;
    const favorites = [{ id: 1, name: 'Product 1' }];
    const mockResponse = { success: true };

    service.saveFavorites(userId, favorites).subscribe((response) => {
      expect(response).toEqual(mockResponse); // Check that the favorites response is correct
    });

    const req = httpMock.expectOne(`${service.getApiUrl()}/${userId}`); // Expect a PATCH request to the user URL
    expect(req.request.method).toBe('PATCH'); // Ensure it's a PATCH request
    expect(req.request.body).toEqual({ favorites }); // Ensure the correct body is sent
    req.flush(mockResponse); // Simulate returning the mock response
  });
});
