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
  filteredTasks: Task[] = [];
  selectedSegment: string = 'all';

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
        this.filterTasks(); 
      });
    }
  }

  filterTasks() {
    if (this.selectedSegment === 'to_do') {
      this.filteredTasks = this.tasks.filter(task => task.status === 'TO_DO');
    } else if (this.selectedSegment === 'done') {
      this.filteredTasks = this.tasks.filter(task => task.status === 'DONE');
    } else {
      this.filteredTasks = this.tasks; 
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
    this.taskService.updateTask(task).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      console.log('Tarefa deletada com sucesso!');
      this.loadTasks();
    });
  }

  async editTask(task: Task) {
    const alert = await this.alertController.create({
      header: 'Editar Tarefa',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Título da tarefa',
          value: task.title, 
          cssClass: 'alert-input',
          attributes: {
            required: true,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descrição da tarefa',
          value: task.description, 
          cssClass: 'alert-textarea',
          attributes: {
            required: true,
          },
        },
        {
          name: 'expirationDate',
          type: 'date',
          placeholder: 'Data de Vencimento',
          value: task.expirationDate, 
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
          text: 'Salvar',
          cssClass: 'alert-button-save',
          handler: (data) => {
            if (!data.title || !data.description || !data.expirationDate) {
              this.showToast('Por favor, preencha todos os campos.'); 
              return false; 
            }

            const updatedTask: Task = {
              ...task,
              title: data.title,
              description: data.description,
              expirationDate: data.expirationDate,
            };

            this.taskService.updateTask(updatedTask).subscribe(() => {
              this.loadTasks();
              this.showToast('Tarefa atualizada com sucesso!');
            });

            return true;
          },
        },
      ],
    });

    await alert.present();
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
              this.showToast('Tarefa adicionada com sucesso!');
            });
  
            return true;
          },
        },
      ],
    });
  
    await alert.present();
  }
}
