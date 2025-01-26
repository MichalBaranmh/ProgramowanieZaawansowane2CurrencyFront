import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-waluty',
  imports: [CommonModule],
  templateUrl: './waluty.component.html',
  styleUrl: './waluty.component.css',
  standalone: true
})
export class WalutyComponent {

  currencies: string[] = [];

  constructor(private http: HttpClient) {}

  fetchCurrencies(): void {
    let url = 'http://localhost:8000/currencies';
    console.log('Fetching currencies with URL:', url);

this.http.get<string[][]>(url).subscribe(
      (data) => {
        console.log('Data received:', data);
        this.currencies = data.map((item) => item[0]);
      },
      (error) => {
        console.error('Error fetching currencies:', error);
      }
    );
  }

  
}
