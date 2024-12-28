import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { RegisterComponent } from './components/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { ParametresComponent } from './components/parametres/parametres.component';
import { ProfilComponent } from './components/profil/profil.component';


  export const routes: Routes = [
    // HomeComponent is the parent of Login, Register, and Forgot Password
    {
      path: '',
      component: HomeComponent,
      children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default to login
        { path: 'login', component: LoginComponent }, // Login form
        { path: 'register', component: RegisterComponent }, // Registration form
        { path: 'forgot-password', component: ForgotPasswordComponent }, // Forgot password page
      ],
    },
  
    // Protected routes
    { path: 'menu', component: MenuComponent, canMatch: [AuthGuard] }, // Protected route for the menu
    { path: 'profil', component: ProfilComponent, canMatch: [AuthGuard] }, // Protected route for profile
    { path: 'parametres', component: ParametresComponent, canMatch: [AuthGuard] }, // Protected route for settings
    { path: 'historique', component: HistoriqueComponent, canMatch: [AuthGuard] }, // Protected route for history
  
    // Catch-all route (redirects to login)
    { path: '**', redirectTo: 'login' },
  ];
  