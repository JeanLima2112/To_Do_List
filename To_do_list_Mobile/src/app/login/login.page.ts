
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) {}

  onLogin() {
    this.authService
      .loginAndStore(this.username, this.password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(() => {
        this.showToast('Algo deu Errado!');
      });
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'dark',
    });
    await toast.present();
  }
}
