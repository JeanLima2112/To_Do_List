import { Component } from '@angular/core';
import { PopoverController, AlertController, ToastController } from '@ionic/angular';
import { TaskService } from './task.service';
import { Router } from '@angular/router';
import { Task } from './task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: Task[] = [];
  isPopoverOpen = false;
  popoverEvent: Event | null = null;
  selectedTask: Task | null = null;

  constructor(
    private taskService: TaskService,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.taskService.getTasks(userId).subscribe((tasks) => {
        this.tasks = tasks;
      });
    }
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
  updateTaskStatus(task: Task) {
    task.status = task.status === 'TO_DO' ? 'DONE' : 'TO_DO';
    this.taskService.updateTask(task).subscribe((updatedTask) => {
      this.loadTasks();
    });
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      console.log('Tarefa deletada com sucesso!');
      this.loadTasks();
    });
  }
  
  editTask(task: Task) {
    console.log('Editar tarefa:', task);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Adicionar nova Tarefa',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Título da tarefa',
          cssClass: 'alert-input',
          attributes: {
            required: true,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descrição da tarefa',
          cssClass: 'alert-textarea',
          attributes: {
            required: true,
          },
        },
        {
          name: 'expirationDate',
          type: 'date',
          placeholder: 'Data de Vencimento',
          cssClass: 'alert-input',
          attributes: {
            required: true,
          },
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Adicionar',
          cssClass: 'alert-button-add',
          handler: (data) => {
   
            if (!data.title || !data.description || !data.expirationDate) {
              this.showToast('Por favor, preencha todos os campos.'); 
              return false; 
            }
  
            const newTask: Task = {
              title: data.title,
              description: data.description,
              expirationDate: data.expirationDate,
              status: 'TO_DO',
              user_id: localStorage.getItem('userId') || '',
            };
  
            this.taskService.createTask(newTask).subscribe(() => {
              this.loadTasks();
            });
  
          
            return true;
          },
        },
      ],
    });
  
    await alert.present();
  }
}
