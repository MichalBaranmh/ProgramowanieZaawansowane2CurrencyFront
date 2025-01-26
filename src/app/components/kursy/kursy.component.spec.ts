import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KursyComponent } from './kursy.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('KursyComponent', () => {
  let component: KursyComponent;
  let fixture: ComponentFixture<KursyComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KursyComponent, HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(KursyComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch rates with year parameter', () => {
    const mockResponse = [
      { RateId: 1, code: 'USD', effectiveDate: '2024-01-01', mid: 3.985 },
      { RateId: 2, code: 'EUR', effectiveDate: '2024-01-02', mid: 4.123 },
    ];

    component.year = 2024;
    component.fetchRates();

    const req = httpMock.expectOne('http://localhost:8000/currencies/getRates?year=2024');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.rates).toEqual(mockResponse);
  });

  it('should fetch rates with exact date parameter', () => {
    const mockResponse = [
      { RateId: 1, code: 'USD', effectiveDate: '2024-01-05', mid: 3.985 },
    ];

    component.exactDate = '20240105';
    component.fetchRates();

    const req = httpMock.expectOne('http://localhost:8000/currencies/getRates?exact_date=20240105');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.rates).toEqual(mockResponse);
  });

  it('should handle HTTP errors', () => {
    component.year = 2024;
    component.fetchRates();

    const req = httpMock.expectOne('http://localhost:8000/currencies/getRates?year=2024');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));

    expect(component.rates).toEqual([]);
  });
});