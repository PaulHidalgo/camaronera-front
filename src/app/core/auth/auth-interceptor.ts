import {Injectable, Injector} from "@angular/core";
import {HttpEvent, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Observable} from 'rxjs';
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2';

import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor {
  private authService: AuthService;

  constructor(
    private injector: Injector
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.authService = this.injector.get(AuthService);

    if (localStorage.getItem('token') != null && localStorage.getItem('token') != undefined) {
      const token =  localStorage.getItem('token');

      const headers = new HttpHeaders().set("Authorization", token);

      const AuthRequest = request.clone( { headers: headers});
      return next.handle(AuthRequest).pipe(
        tap(event => {
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 401:
                Swal.fire({
                  allowOutsideClick: false,
                  icon: 'error',
                  title: 'Sesión expirada!!',
                  text: 'Vuelva a iniciar sesión'
                }).then(result => {
                  if (result.value) {
                    this.authService.logout();
                  }
                });
                break;
              case 400:
              case 500:
                Swal.fire({
                  icon: 'error',
                  text: 'Error interno del servidor!!'
                });
                break;
              case 404:
                Swal.fire({
                  icon: 'error',
                  text: 'Recurso no encontrado'
                });
                break;
              case 0:
                Swal.fire({
                  icon: 'error',
                  text: 'Por favor revisa la conexión a internet'
                });
                break;
              default:
                Swal.fire({
                  icon: 'error',
                  text: 'Servidor no disponible!!'
                });
            }
          }
        }
      ) );
    } else {
      console.log('no token');
      return next.handle(request);
    }


  }
}
