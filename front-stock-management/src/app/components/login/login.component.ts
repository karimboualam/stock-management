import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login', // Component selector to be used in HTML
  standalone: true, // Indicates this component is a standalone component
  imports: [FormsModule, RouterModule, CommonModule, HttpClientModule], // Required Angular modules for this component
  templateUrl: './login.component.html', // Path to the HTML template
  styleUrls: ['./login.component.css'], // Path to the CSS styles
})
export class LoginComponent {
  // Properties to bind with the login form inputs
  email = ''; // Stores the user's email input
  password = ''; // Stores the user's password input
  //firstName: any; // Variable to store the user's first name after login
  //lastName: any; // Variable to store the user's last name after login

  constructor(private authService: AuthService, private router: Router) {}

  // Method triggered on form submission
 login() {
    // Call the login API via AuthService and pass email and password
     this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response: any) => {
        if (response && response.token) {
          // Log the received token to the console (for debugging)
          console.log('Token received:', response.token);

           // Store the user data in cookies
           this.authService.storeUserData(response); 


          // Store the user data in localStorage for later use
      /*    localStorage.setItem('token', response.token); // Store the JWT token
          localStorage.setItem('firstName', response.firstName); // Store the user's first name
          localStorage.setItem('lastName', response.lastName); // Store the user's last name*/

          // Debug logs to verify data storage
      /*    console.log('LOGIN: API Response:', response);
          console.log('LOGIN: First name stored:', response.firstName);
          console.log('LOGIN: Last name stored:', response.lastName);*/

          // Redirect the user to the menu page after successful login
          this.router.navigate(['/menu']);
        } else {
          // Handle unexpected responses from the server
          console.error('Unexpected response:', response);
          alert('Error: Unexpected response from the server.');
        }
      },
      (error) => {
        // Handle login errors (e.g., incorrect credentials or server issues)
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  } 
}
