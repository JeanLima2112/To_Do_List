import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthResponse {
  token: string;
  expiresIn: number;
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    const body = { username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<AuthResponse>(this.apiUrl, body, { headers });
  }

  loginAndStore(username: string, password: string): void {
    this.login(username, password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id);
        window.location.reload(); // Gambiarra
      },
      error: (error) => {
        console.error('Erro ao fazer login:', error);
      },
    });
  }
}
