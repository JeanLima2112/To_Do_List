import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TaskService } from './task.service'; // Importe o serviço
import { Task } from './task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  userId: string| null = localStorage.getItem('UserId'); 

  constructor(private alertController: AlertController, private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks(); 
  }

  loadTasks() {
    this.taskService.getTasks(this.userId).subscribe(
      (tasks) => {
        this.tasks = tasks;
        console.log(tasks); 
      },
      (error) => {
        console.error('Erro ao obter tarefas:', error); 
      }
    );
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Adicionar nova Tarefa',
      message: 'Aqui será o Formulario de Criação.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
