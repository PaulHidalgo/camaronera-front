import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.url;

  userToken: string;

  // Crear nuevo usuario
  // http://localhost:3000/usuario

  // Login
  // http://localhost:3000/login

  constructor( private http: HttpClient,
    private router: Router ) {

    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
    this.router.navigateByUrl('/login');
  }

  login( usuario: UsuarioModel){
    const authData = {
      ...usuario,
      passwrod: usuario.password
    };

    return this.http.post(`${this.url}/login`,
    authData).pipe(
      map( resp => {
        this.guardarToken(resp[ 'token' ]);
        return resp;
      })
    );
  }

  nuevoUsuario( usuario: UsuarioModel){
    const authData = {
      ...usuario,
      passwrod: usuario.password
    };

    return this.http.post(`${this.url}/usuario`,
      authData
    );
  }

  private guardarToken( idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(){
    if (localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {
    if (localStorage.getItem('token')) {
      if(localStorage.getItem('token') == 'undefined'){
        return false;
      } else {
        return true;
      }
    } else {
      const expira = Number(  localStorage.getItem('expira'));
      const expiraDate = new Date();

      expiraDate.setTime(expira);

      if (expiraDate > new Date()) {
        return true;
      } else {
        if (this.userToken.length > 2) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
