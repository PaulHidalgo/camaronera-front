import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

usuario: UsuarioModel;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

   }

   onSubmit(form: NgForm){

    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor!!'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario).subscribe(resp => {

      if (resp['ok']) {

        console.log(resp);
        Swal.close();
        Swal.fire({
          icon: 'info',
          title: 'Registro Exitoso!!',
          text: 'Realiza un login hacia la aplicación'
        });
        this.router.navigateByUrl('/login');

      } else {
        Swal.fire({
          title: 'Error al crear registro',
          text: resp['err'].message,
          icon: 'error'
        });
      }

    }, (err) => {
      console.log(err);
      Swal.fire({
        title: 'Error al crear registro',
        text: err['error'].err.message,
        icon: 'error'
      });
    });
   }


}
