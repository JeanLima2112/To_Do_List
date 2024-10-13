import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl); 
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task); 
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task); 
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`); 
  }
}
