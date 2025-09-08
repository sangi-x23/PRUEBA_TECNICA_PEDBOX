import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "home", component: HomeComponent, canActivate: [AuthGuard]}
];
