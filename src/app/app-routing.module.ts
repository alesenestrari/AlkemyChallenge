import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PlatoComponent } from './pages/home/menu/plato/plato.component';
import { AuthGuard } from './services/auth.guard';
import { PlatoDetailComponent } from './pages/home/platoDetail/plato-detail/plato-detail.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard], 
    children: [{
      path: ':id', component: PlatoDetailComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
