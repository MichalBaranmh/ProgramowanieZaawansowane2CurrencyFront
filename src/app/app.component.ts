import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KursyComponent } from './components/kursy/kursy.component';
import { WalutyComponent } from './components/waluty/waluty.component';
import { PobieranieComponent } from './components/pobieranie/pobieranie.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, KursyComponent, WalutyComponent,PobieranieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CurrencyFront';
}
