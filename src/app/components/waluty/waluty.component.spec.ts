import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalutyComponent } from './waluty.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';

describe('WalutyComponent', () => {
  let component: WalutyComponent;
  let fixture: ComponentFixture<WalutyComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalutyComponent, HttpClientTestingModule, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WalutyComponent);
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

  it('should fetch currencies and update the currencies array', () => {
    const mockResponse = [['USD'], ['EUR'], ['JPY']];

    component.fetchCurrencies();

    const req = httpMock.expectOne('http://localhost:8000/currencies');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.currencies).toEqual(['USD', 'EUR', 'JPY']);
  });

  it('should handle HTTP errors', () => {
    component.fetchCurrencies();

    const req = httpMock.expectOne('http://localhost:8000/currencies');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));

    expect(component.currencies).toEqual([]);
  });
});