import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Permet d'injecter ce service dans toute l'application
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';  // URL de base pour le backend

  constructor(private http: HttpClient) {}  // Injection du service HttpClient

  // Méthode pour l'inscription
  register(user: { email: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // Méthode pour la connexion
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
}
