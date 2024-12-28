import { Injectable } from '@angular/core';
import { CanMatch, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch {
  constructor(private router: Router) {}

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true; // L'utilisateur est authentifié, on autorise l'accès
    } else {
      this.router.navigate(['/login']); // Si pas de token, redirection vers login
      return false;
    }
  }
}
