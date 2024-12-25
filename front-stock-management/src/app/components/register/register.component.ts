import { Component } from '@angular/core';
//import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,  // Indique que ce composant est autonome
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, RouterModule],  // Déclarez les modules nécessaires
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  //role: string = 'USER';  // Par défaut 'USER'
  role: string = '';
  errorMessage: string = '';  // Variable pour afficher les messages d'erreur
  successMessage: string = '';  // Variable pour afficher un message de succès


  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const user = { email: this.email, password: this.password, role: this.role };
    this.authService.register(user).subscribe(
      (response) => {
        this.successMessage = 'Utilisateur enregistré avec succès!';
        this.errorMessage = ''; // Réinitialiser les messages d'erreur
        console.log(response);  // Afficher la réponse dans la console
      },
      (error) => {
        this.errorMessage = 'Erreur d\'inscription: ' + (error.error.message || error.message);
        this.successMessage = ''; // Réinitialiser les messages de succès
        console.error(error);  // Afficher l'erreur dans la console
      }
    );
  }
}
