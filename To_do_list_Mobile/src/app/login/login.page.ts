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
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login bem-sucedido!', response);
        this.router.navigate(['/home']);  
      },
      (error) => {
        console.error('Erro no login', error);
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']); 
  }
}
