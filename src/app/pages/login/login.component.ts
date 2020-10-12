import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordar = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordar = true;
    }
  }

  login( form: NgForm){

    if (form.invalid) {return; }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor!!'
    });
    Swal.showLoading();

    this.auth.login( this.usuario)
    .subscribe(resp => {

      if (resp['ok']) {
        Swal.close();

        if (this.recordar) {
          localStorage.setItem('email', this.usuario.email);
        } else {
          if (localStorage.getItem('email')) {
            localStorage.removeItem('email');
          }
        }

        this.router.navigateByUrl('/home');
      } else {
        Swal.fire({
          title: 'Error al autenticar',
          text: resp['err'].message,
          icon: 'error'
        });
      }

    }, (err) => {
      console.log(err);
    });
  }

}
