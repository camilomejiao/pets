import { NgModule, Component } from '@angular/core';
//Importamos el router
import { RouterModule, Routes } from '@angular/router';
//
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { ServiciomedicoComponent } from './pages/serviciomedico/serviciomedico.component';
import { ShopComponent } from './pages/shop/shop.component';

const routes: Routes = [

{ path: '',
  component: PagesComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'mascota', component: MascotasComponent },
    { path: 'servicios', component: ServiciomedicoComponent },
    { path: 'tienda', component: ShopComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  ]
},
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: '**', component: NopagefoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
