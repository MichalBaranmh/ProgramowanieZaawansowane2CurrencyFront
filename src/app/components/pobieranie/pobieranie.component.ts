import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pobieranie',
  imports: [CommonModule,FormsModule],
  templateUrl: './pobieranie.component.html',
  styleUrl: './pobieranie.component.css',
  standalone: true
})
export class PobieranieComponent {
  code: string = '';
  startDate: string = '';
  endDate: string = '';


  constructor(private http: HttpClient) {
  }

  download():void{
    if(!this.code || !this.startDate || !this.endDate){
      alert('Wprowadź dane');
      return;
    }

    const url=`http://localhost:8000/currencies/fetch/${this.code}/${this.startDate}/${this.endDate}`;
    this.http.post(url,{}).subscribe(
      (response) => {
        alert('Pobrano dane');
      },
      (error) => {
        alert('Błąd podczas pobierania danych');
      }
    );


  }
}
