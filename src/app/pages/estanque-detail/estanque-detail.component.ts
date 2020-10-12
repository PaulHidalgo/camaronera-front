import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { EstanqueModel } from '../../models/estanque.model';
import { EstanqueService } from '../../services/estanque.service';

@Component({
  selector: 'app-estanque-detail',
  templateUrl: './estanque-detail.component.html',
  styleUrls: ['./estanque-detail.component.css']
})
export class EstanqueDetailComponent implements OnInit {

  estanque = new EstanqueModel();

  constructor(private estanqueService: EstanqueService, private activatedRoute: ActivatedRoute , private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if ( id !== 'nuevo' ) {
      this.estanqueService.getEstanque(id)
        .subscribe( (resp) => {
          if (resp['ok']) {
            this.estanque = resp['estanque']
            this.estanque.id = id;
          } else {
            this.router.navigateByUrl('/home');
          }
        });
    }
  }

  regresar(){
    this.router.navigate(['/estanque', localStorage.getItem('granja')]);
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

    if (this.estanque.id) {
      this.estanqueService.actualizarEstanque(this.estanque)
        .subscribe(
          res => {
            console.log(res);
            if (res['ok']) {
              Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                title: 'Registro Actualizado!!',
                text: `Estanque ${res['estanque'].nombre} actualizada`
              }).then(result => {
                if (result.value) {
                 this.regresar();
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
      this.estanque.granja = localStorage.getItem('granja');

      this.estanqueService.crearEstanque(this.estanque)
      .subscribe( res => {
        console.log(res);
        if (res['ok']) {
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: 'Registro Exitoso!!',
            text: `Estanque ${res['estanque'].nombre} creada`
          }).then(result => {
            if (result.value) {
              this.regresar();
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
