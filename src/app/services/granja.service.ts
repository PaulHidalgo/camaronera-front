import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GranjaModel } from '../models/granja.model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GranjaService {

  private url = environment.url;

  constructor( private http: HttpClient ) {}

  crearGranja(granja: GranjaModel){
    return this.http.post(`${this.url}/granja`, granja)
    .pipe(
      map((resp: any) => {
        granja.id = resp.granja._id;
        resp.granja = granja;
        return resp;
      })
    );
  }

  actualizarGranja(granja: GranjaModel){

    const granjaTemp = {
      ...granja
    };

    delete granjaTemp.id;

    return this.http.put(`${this.url}/granja/${granja.id}`, granjaTemp);
  }

  getGranja( id: string){
    return  this.http.get(`${this.url}/granja/${id}`);
  }

  getGranjas() {
    return this.http.get(`${this.url}/granja`)
    .pipe(
      map(this.crearArreglo));

  }

  borrarGranja( id: string ) {
    return  this.http.delete(`${this.url}/granja/${id}`);
  }

  private crearArreglo(granjaObj: object) {

    const granjas: GranjaModel[] = [];

    if (granjaObj === null) {return []; }

    Object.keys( granjaObj).forEach(key => {

      if (key == 'granjas') {
        const granja: GranjaModel = granjaObj[key];
        granjas.push(granja);
      }

    });

    return granjas;

  }

}
