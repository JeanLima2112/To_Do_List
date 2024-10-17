import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from './../login/login.service';
import { UserService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  async onRegister() {
    this.isLoading = true;

    this.userService
      .createUser(this.name, this.username, this.password)
      .subscribe(
        async (response) => {
          console.log('Usuário criado com sucesso:', response);

          this.authService.loginAndStore(this.username, this.password);
          this.router.navigate(['/home']);
        },
        async (error) => {
          console.error('Erro ao criar usuário:', error);
          await this.showToast(
            'Erro ao criar usuário: ' +
              (error.error.message || 'Tente novamente.')
          );
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }
}
