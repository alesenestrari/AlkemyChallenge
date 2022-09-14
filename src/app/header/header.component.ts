import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogged = false;

  sub: Subscription;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    if (localStorage.length > 0) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    Swal.fire({
      title:"¿Seguro que desea cerrar sesión?",
      text: "Debe iniciar nuevamente.",
      icon: "warning",
      showCancelButton: true,      
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'No',
    }).then((onLogout) => {
      if (onLogout.isConfirmed) {
        Swal.fire({title:"Has cerrado la Sesion.", icon: "success"}).then(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/login'])
        })
      } else {

      }
    });
  }



  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
