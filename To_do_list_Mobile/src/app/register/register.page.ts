import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  name: string = '';  
  username: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {}

  onRegister() {
    this.userService.createUser(this.name, this.username, this.password).subscribe(
      response => {
        console.log('Usuário criado com sucesso:', response);
        this.router.navigate(['/login']);
      },
      error => {
        alert('Erro ao criar usuário:');
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}