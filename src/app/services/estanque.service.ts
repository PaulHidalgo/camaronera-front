import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstanqueModel } from '../models/estanque.model';
import { map } from 'rxjs/operators';
import { GranjaModel } from '../models/granja.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstanqueService {

  private url = environment.url;

  constructor( private http: HttpClient ) {}

  getEstanques(id: String) {
    return this.http.get(`${this.url}/estanqueByGranja/${id}`);
  }

  crearEstanque(estanque: EstanqueModel){
    return this.http.post(`${this.url}/estanque`, estanque)
    .pipe(
      map((resp: any) => {
        estanque.id = resp.estanque._id;
        resp.estanque = estanque;
        return resp;
      })
    );
  }

  actualizarEstanque(estanque: EstanqueModel){

    const estanqueTemp = {
      ...estanque
    };

    delete estanqueTemp.id;

    return this.http.put(`${this.url}/estanque/${estanque.id}`, estanqueTemp);
  }

  getEstanque( id: string){
    return  this.http.get(`${this.url}/estanque/${id}`);
  }

  borrarEstanque( id: string ) {
    return  this.http.delete(`${this.url}/estanque/${id}`);
  }

}
