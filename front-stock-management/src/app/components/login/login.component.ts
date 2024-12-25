import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response: any) => {
        console.log('Token reçu:', response);
        localStorage.setItem('token', response); // Stockez le token dans le localStorage
        this.router.navigate(['/home']); // Redirigez vers la page d'accueil
      },
      (error) => {
        console.error('Erreur de connexion:', error);
        alert('Échec de la connexion. Vérifiez vos informations.');
      }
    );
  }
}