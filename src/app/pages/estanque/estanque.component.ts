import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { EstanqueService } from '../../services/estanque.service';
import { EstanqueModel } from '../../models/estanque.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-estanque',
  templateUrl: './estanque.component.html',
  styleUrls: ['./estanque.component.css']
})
export class EstanqueComponent implements OnInit {

  estanques: EstanqueModel[] = [];
  total: number;
  cargando = false;
  id:string;

  constructor(private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private estanqueService: EstanqueService,
    private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cargando = true;

    this.estanqueService.getEstanques(this.id)
      .subscribe( (resp: any) => {
        this.cargando = false;
        this.estanques = resp.estanques;
        this.total = resp.tamanioGranja;
      });
  }

  borrarEstanque(estanque, i: number) {
    Swal.fire({
      title: 'Estás seguro?',
      text: `Está seguro que desea borrar a ${estanque.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if (resp.value){
        this.estanques.splice(i, 1);
        this.total = this.total - estanque.tamanio;
        this.estanqueService.borrarEstanque(estanque._id).subscribe();
      }
    });
  }

  salir() {
    this.auth.logout();
  }

}
