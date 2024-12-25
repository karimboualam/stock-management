import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  role: string = '';

  register() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Role:', this.role);
    console.log(this.role); // Vous pouvez vérifier la valeur sélectionnée ici
  }
 
}
