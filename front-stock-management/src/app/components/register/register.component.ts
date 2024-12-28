import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for common Angular directives
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for HTTP requests

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, RouterModule, CommonModule, HttpClientModule], // Import necessary modules
})
export class RegisterComponent {
  // Declare variables for form fields
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = '';
  gender: string = '';
  lastName: string = '';
  firstName: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // The register function that is triggered when the form is submitted
  register() {
    // Client-side validation for passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match."; // Display error if passwords don't match
      this.successMessage = '';
      return; // Exit function if passwords don't match
    }

    // Prepare the user object to send to the backend
    const user = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword, // Send confirmPassword for backend validation if necessary
      role: this.role,
      gender: this.gender,
      lastName: this.lastName,
      firstName: this.firstName,
    };

    // Call the register method from AuthService to make the HTTP request
    this.authService.register(user).subscribe(
      (response: any) => {
        // Handle the response if registration is successful
        if (response && response.message) {
          this.successMessage = response.message; // Show success message
          this.errorMessage = ''; // Clear any error message
          console.log('Success:', response.message);
          // Redirect to the login page after successful registration
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Error: Unexpected server response.'; // Handle unexpected server response
          this.successMessage = '';
        }
      },
      (error) => {
        // Handle error in case of a failed registration request
        console.error('Registration error:', error);
        this.errorMessage = error.error?.message || 'Unknown error.'; // Display error message
        this.successMessage = '';
      }
    );
  }
}
