import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import the HttpClientTestingModule for mocking HTTP requests
      providers: [DataService], // Provide the DataService
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController); // Inject HttpTestingController for testing HTTP requests
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests remain
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Test if the service is created successfully
  });

  it('should fetch all data from the API', () => {
    const mockData = [
      { id: 1, title: 'Product 1' },
      { id: 2, title: 'Product 2' },
    ];

    service.getAllData().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockData);
    });

    // Expect the request to be made to the correct URL
    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET'); // Ensure it's a GET request
    req.flush(mockData); // Simulate the response with mock data
  });

  it('should set the search result correctly', () => {
    const searchQuery = 'New Search Query';
    service.setSearch(searchQuery);
    expect(service.searchResult).toBe(searchQuery); // Verify that the search result is set correctly
  });
});
