import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { GranjaService } from '../../services/granja.service';
import { GranjaModel } from '../../models/granja.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  granjas: GranjaModel[] = [];
  cargando = false;

  constructor(private auth: AuthService,
    private granjaService: GranjaService,
    private router: Router) { }

  ngOnInit() {
    this.cargando = true;
    localStorage.removeItem('granja');
    this.granjaService.getGranjas()
      .subscribe( (resp: any) => {
        this.cargando = false;
        this.granjas = resp[0];
      });
  }

  borrarGranja(granja, i: number) {
    Swal.fire({
      title: 'Estás seguro?',
      text: `Está seguro que desea borrar a ${granja.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if (resp.value){
        this.granjas.splice(i, 1);
        this.granjaService.borrarGranja(granja._id).subscribe();
      }
    });
  }

  salir() {
    this.auth.logout();
  }

  goToEstanques(id){
    localStorage.setItem( 'granja' , id);
    this.router.navigate(['/estanque', id]);
  }

}
