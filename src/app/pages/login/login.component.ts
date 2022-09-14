import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login!: FormGroup;
  user: User = {
    email: "",
    password: ""
  };
  
  data = {
    token: ""
  };

  loading = false;

  constructor(private fbuilder: FormBuilder, private userService: UserService, private alert: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.login = this.fbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })

  }

  onLogin() {
    this.loading=true;
    this.userService.login(this.user).subscribe(next => {
      this.loading=false;
      this.alert.showAlertSuccess('Usuario logueado.');
      localStorage.setItem('token', next.token);
      this.router.navigate(['./']).then(() => {
        window.location.reload();
      });
      console.log(next);
    }, error => {
      this.alert.showAlertError('Ha ocurrido un error', error.error.error);
      console.log(error);
      this.loading = false;
    });
  }

}
