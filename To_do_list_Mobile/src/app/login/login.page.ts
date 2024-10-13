import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';  
  password: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.loginAndStore(this.username, this.password); 
    this.router.navigate(['/home']);  
  }

  goToRegister() {
    this.router.navigate(['/register']); 
  }
}
