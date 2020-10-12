import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { GranjaComponent } from './pages/granja/granja.component';
import { AuthGuard } from './guards/auth.guard';
import { EstanqueComponent } from './pages/estanque/estanque.component';
import { EstanqueDetailComponent } from './pages/estanque-detail/estanque-detail.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent,  canActivate: [AuthGuard]},
  { path: 'granja/:id', component: GranjaComponent,  canActivate: [AuthGuard]},
  { path: 'estanque/:id', component: EstanqueComponent,  canActivate: [AuthGuard]},
  { path: 'estanque-detail/:id', component: EstanqueDetailComponent,  canActivate: [AuthGuard]},
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
