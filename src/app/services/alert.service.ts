import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showAlertSuccess(text: string) {
    return Swal.fire({
      title: text,
      text: "Haga click para continuar",
      icon: 'success',
      showConfirmButton: true
    })
  }

  showAlertError(tittle: string, text : string){
    return Swal.fire({
      icon: 'error',
      title: tittle,
      text: text,
    });
  }
}
