import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
/*logout() {
throw new Error('Method not implemented.');
}*/
  // Variables to store the first and last names of the user
  firstName: string | null = '';
  lastName: string | null = '';
  userId: string | null = '';


  constructor(private router: Router, private cookieService: CookieService) {}
  

  ngOnInit() {
    // Retrieve the first name and last name from localStorage after login
  //  this.firstName = localStorage.getItem('firstName');
    //this.lastName = localStorage.getItem('lastName');
      // Retrieve user data from cookies
  //    this.firstName = this.cookieService.get('firstName');
    //  this.lastName = this.cookieService.get('lastName');
      // Assurez-vous que les cookies sont bien présents avant de les lire
   if (this.cookieService.check('firstName') && this.cookieService.check('lastName')) {
    this.firstName = this.cookieService.get('firstName');
    this.lastName = this.cookieService.get('lastName');
    this.userId = this.cookieService.get('userId');

  } else {
    console.error("Cookies not found!");

     // Redirect the user to the login page or show an error
     alert('Session expired or not logged in. Redirecting to login page.');
     this.router.navigate(['/login']); // Redirect to login
  }
    

    // Debugging: Log the retrieved values to the console
    console.log('First Name:', this.firstName, 'Last Name:', this.lastName);
    console.log('HEADER : First Name:', this.firstName);
    console.log('HEADER : Last Name:', this.lastName);
    console.log('HEADER : userId:', this.userId);




  }

  // Method to retrieve the user's email from localStorage
    // Method to retrieve the user's email from cookies

  getUserEmail(): string {
 //   return localStorage.getItem('email') || 'User'; // Default to 'User' if no email is found
    return this.cookieService.get('email') || 'User';

  }

  // Method to log the user out
  logout() {
    // Remove the token and email from localStorage
    
  //  localStorage.removeItem('token'); // Remove the authentication token
   // localStorage.removeItem('email'); // Remove the stored email
   // this.router.navigate(['/login']); // Redirect the user to the login page

      // Remove the cookies
      this.cookieService.delete('token');
      this.cookieService.delete('firstName');
      this.cookieService.delete('lastName');
      this.cookieService.delete('userId');
     this.router.navigate(['/login']); // Redirect the user to the login page

  } 
  }
