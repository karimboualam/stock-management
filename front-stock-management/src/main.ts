import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';  // Importez HttpClientModule
import { provideHttpClient } from '@angular/common/http'; // Fournir HttpClient
import { HomeComponent } from './app/components/home/home.component';

// Initialisation de l'application avec les routes et HttpClientModule
bootstrapApplication(HomeComponent, {
  providers: [
    provideRouter(routes),  // Fournir les routes de votre application
    provideHttpClient(),     // Fournir HttpClient pour les requêtes HTTP
    HttpClientModule         // Assurez-vous que HttpClientModule est inclus
  ],
}).catch(err => console.error(err));
