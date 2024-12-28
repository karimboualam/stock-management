import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // Variables to store the first and last names of the user
  firstName: string | null = '';
  lastName: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Retrieve the first name and last name from localStorage after login
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');

    // Debugging: Log the retrieved values to the console
    console.log('First Name:', this.firstName, 'Last Name:', this.lastName);
    console.log('HEADER : First Name:', this.firstName);
    console.log('HEADER : Last Name:', this.lastName);
  }

  // Method to retrieve the user's email from localStorage
  getUserEmail(): string {
    return localStorage.getItem('email') || 'User'; // Default to 'User' if no email is found
  }

  // Method to log the user out
  logout() {
    // Remove the token and email from localStorage
    localStorage.removeItem('token'); // Remove the authentication token
    localStorage.removeItem('email'); // Remove the stored email
    this.router.navigate(['/login']); // Redirect the user to the login page
  }
}
