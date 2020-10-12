import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import {GranjaModel} from '../../models/granja.model';
import { GranjaService } from '../../services/granja.service';

@Component({
  selector: 'app-granja',
  templateUrl: './granja.component.html',
  styleUrls: ['./granja.component.css']
})
export class GranjaComponent implements OnInit {

  granja = new GranjaModel();

  constructor(private granjaService: GranjaService, private activatedRoute: ActivatedRoute , private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {
      this.granjaService.getGranja(id)
        .subscribe( (resp) => {
          if (resp['ok']) {
            this.granja = resp['granja']
            this.granja.id = id;
          } else {
            this.router.navigateByUrl('/home');
          }
        });
    }
  }

  guardar( form: NgForm) {

    if (form.invalid){
      Swal.fire({
        title: 'Error!!',
        text: 'Formulario inválido',
        icon: 'error'
      });
      return;
    }

    if (this.granja.id) {
      this.granjaService.actualizarGranja(this.granja)
        .subscribe(
          res => {
            console.log(res);
            if (res['ok']) {
              Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                title: 'Registro Actualizado!!',
                text: `Granja ${res['granja'].nombre} actualizada`
              }).then(result => {
                if (result.value) {
                  this.router.navigateByUrl('/home');
                }
              });
            } else {
              Swal.fire({
                title: 'Error al actualizar registro',
                text: 'res.message',
                icon: 'error'
              });
            }
          }
        );
    } else {

      this.granjaService.crearGranja(this.granja)
      .subscribe( res => {
        console.log(res);
        if (res['ok']) {
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Registro Exitoso!!',
            text: `Granja ${res['granja'].nombre} creada`
          }).then(result => {
            if (result.value) {
              this.router.navigateByUrl('/home');
            }
          });
        } else {
          Swal.fire({
            title: 'Error al crear registro',
            text: 'res.message',
            icon: 'error'
          });
        }
      });
    }

  }

}
