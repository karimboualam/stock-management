import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "../login/login.component";
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
