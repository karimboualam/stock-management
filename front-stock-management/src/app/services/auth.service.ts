import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
//import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'  // Makes this service available throughout the application
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';  // The base URL for the backend authentication API

  constructor(private http: HttpClient, private cookieService: CookieService) {}  // Injecting HttpClient service to make HTTP requests


  isAuthenticated(): boolean {
    // Check if token and user details are available in cookies
    return this.cookieService.check('token') &&
           this.cookieService.check('firstName') &&
           this.cookieService.check('lastName');
} 


  // Method for user registration
  register(user: { email: string; password: string; role: string }): Observable<any> {
    // Send a POST request to the backend to register the user
    return this.http.post(`${this.baseUrl}/register`, user, { responseType: 'text' });
  }

  // Method for user login
 login(credentials: { email: string; password: string }): Observable<any> {
    // Send a POST request to the backend with the user's credentials
    return this.http.post(`${this.baseUrl}/login`, credentials, { responseType: 'text' })
      .pipe(
        map((response: string) => {
          try {
            // Try to parse the response as JSON
            return JSON.parse(response);
         //   return response;  // Return the response as-is if it contains a token

          } catch {
            // If the response is not in JSON format, return it as is with a token key
            return { token: response };
          }
        })
      );
  } 

  // Method to store user data in cookies after login
  
 storeUserData(response: any): void {
this.cookieService.set('token', response.token, 1, '/', 'localhost', true, 'Strict'); // Changez 'None' par 'Strict'
this.cookieService.set('firstName', response.firstName, 1, '/', 'localhost', true, 'Strict');
this.cookieService.set('lastName', response.lastName, 1, '/', 'localhost', true, 'Strict');
this.cookieService.set('userId', response.userId, 1, '/', 'localhost', true, 'Strict');

  }

  // Method to retrieve user details from cookies
  getUserDetails(): any {
    return {
      firstName: this.cookieService.get('firstName'),  // Get first name from cookies
      lastName: this.cookieService.get('lastName'),    // Get last name from cookies
    };
  } 
}