import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kursy',
  imports: [CommonModule, FormsModule],
  templateUrl: './kursy.component.html',
  styleUrl: './kursy.component.css',
  standalone: true
})
export class KursyComponent{

  rates: any[] = [];
  year: number = 2024;
  quarter: number | null = null;
  startDate: string = '';
  endDate: string = '';
  exactDate: string = '';

  constructor(private http: HttpClient) {}

  fetchRates(): void {
    let url = 'http://localhost:8000/currencies/getRates';
    const params: any = {};
  
    if (this.exactDate) {
      params.exact_date = this.exactDate;
    } else if (this.startDate && this.endDate) {
      params.start_date = this.startDate;
      params.end_date = this.endDate;
    } else if (this.year && this.quarter) {
      params.year = this.year;
      params.quarter = this.quarter;
    } else if (this.year) {
      params.year = this.year;
    }
  
    console.log('Fetching rates with URL:', url);
    console.log('Params:', params);
  
    this.http.get<any[]>(url, { params }).subscribe(
      (data) => {
        console.log('Data received:', data);
        this.rates = data;
      },
      (error) => {
        console.error('Error fetching rates:', error);
      }
    );
  }

  
}
