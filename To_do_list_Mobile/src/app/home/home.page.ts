import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Task } from './task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: Task[] = [];
  userId: string = 'some-user-id'; 

  constructor(private alertController: AlertController) {}

  async addTask() {
    const alert = await this.alertController.create({
      header: 'Nova Tarefa',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Título da Tarefa',
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descrição da Tarefa',
        },
        {
          name: 'expirationDate',
          type: 'date',
          placeholder: 'Data de Vencimento',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Criação cancelada');
          },
        },
        {
          text: 'Adicionar',
          handler: (data) => {
            if (
              data.title.trim() &&
              data.description.trim() &&
              data.expirationDate
            ) {
              const newTask: Task = {
                id: new Date().toISOString(), // Gera um ID único com base na data
                user_id: this.userId,
                title: data.title,
                description: data.description,
                status: 'TO_DO',
                expirationDate: data.expirationDate,
              };
              this.tasks.push(newTask);
              console.log('Tarefa adicionada:', newTask);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async completeTask(task: Task) {
    const alert = await this.alertController.create({
      header: 'Confirmar Conclusão',
      message: `Você tem certeza que deseja concluir a tarefa "${task.title}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Conclusão cancelada');
          },
        },
        {
          text: 'Concluir',
          handler: () => {
            task.status = 'DONE';
            console.log('Tarefa concluída:', task);
          },
        },
      ],
    });

    await alert.present();
  }

  async editTask(task: Task) {
    const alert = await this.alertController.create({
      header: 'Editar Tarefa',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Título da Tarefa',
          value: task.title,
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descrição da Tarefa',
          value: task.description,
        },
        {
          name: 'expirationDate',
          type: 'date',
          placeholder: 'Data de Vencimento',
          value: task.expirationDate,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Edição cancelada');
          },
        },
        {
          text: 'Salvar',
          handler: (data) => {
            if (
              data.title.trim() &&
              data.description.trim() &&
              data.expirationDate
            ) {
              task.title = data.title;
              task.description = data.description;
              task.expirationDate = data.expirationDate;
              console.log('Tarefa editada:', task);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteTask(taskId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Você tem certeza que deseja excluir esta tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Exclusão cancelada');
          },
        },
        {
          text: 'Excluir',
          handler: () => {
            this.tasks = this.tasks.filter((task) => task.id !== taskId);
            console.log('Tarefa com ID', taskId, 'deletada');
          },
        },
      ],
    });

    await alert.present();
  }
}
