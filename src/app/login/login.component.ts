// login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    //this.model.action = 'login';
    this.authService.loginForm(this.model).subscribe(response => {
        this.authService.setUser(response);
    }, error => {
      console.error(error);
    });
  }
}
