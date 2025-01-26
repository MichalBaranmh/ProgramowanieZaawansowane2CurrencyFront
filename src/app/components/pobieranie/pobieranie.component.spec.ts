import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PobieranieComponent } from './pobieranie.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('PobieranieComponent', () => {
  let component: PobieranieComponent;
  let fixture: ComponentFixture<PobieranieComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PobieranieComponent, HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PobieranieComponent);
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

  it('should show an alert if form is incomplete', () => {
    spyOn(window, 'alert');


    component.code = '';
    component.startDate = '20230101';
    component.endDate = '20230131';
    component.download();
    expect(window.alert).toHaveBeenCalledWith('Wprowadź dane');

    component.code = 'USD';
    component.startDate = '';
    component.endDate = '20230131';
    component.download();
    expect(window.alert).toHaveBeenCalledWith('Wprowadź dane');


    component.code = 'USD';
    component.startDate = '20230101';
    component.endDate = '';
    component.download();
    expect(window.alert).toHaveBeenCalledWith('Wprowadź dane');
  });

  it('should make a POST request when form is complete', () => {
    spyOn(window, 'alert');

    component.code = 'USD';
    component.startDate = '20230101';
    component.endDate = '20230131';
    component.download();

    const req = httpMock.expectOne('http://localhost:8000/currencies/fetch/USD/20230101/20230131');
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(window.alert).toHaveBeenCalledWith('Pobrano dane');
  });

  it('should handle HTTP errors', () => {
    spyOn(window, 'alert');

    component.code = 'USD';
    component.startDate = '20230101';
    component.endDate = '20230131';
    component.download();

    const req = httpMock.expectOne('http://localhost:8000/currencies/fetch/USD/20230101/20230131');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Network error'));

    expect(window.alert).toHaveBeenCalledWith('Błąd podczas pobierania danych');
  });
});
