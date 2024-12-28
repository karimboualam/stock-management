import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Makes this service available throughout the application
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';  // The base URL for the backend authentication API

  constructor(private http: HttpClient) {}  // Injecting HttpClient service to make HTTP requests

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
          } catch {
            // If the response is not in JSON format, return it as is with a token key
            return { token: response };
          }
        })
      );
  }

  // Example: Retrieve user details (like first name and last name) from localStorage or another source
  getUserDetails(): any {
    return {
      firstName: localStorage.getItem('firstName'),  // Get first name from localStorage
      lastName: localStorage.getItem('lastName'),    // Get last name from localStorage
    };
  }
}
