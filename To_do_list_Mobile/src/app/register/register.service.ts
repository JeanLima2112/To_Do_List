import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  createUser(name:string,username: string, password: string): Observable<any> {
    const body = { name,username,password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, body, { headers });
  }
}