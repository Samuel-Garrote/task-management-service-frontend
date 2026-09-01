import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly authenticatedSectionKey = 'authToken';

  isLoggedIn = signal<boolean>(localStorage.getItem(this.authenticatedSectionKey) !== null);

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, registerRequest);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap((dataResponse) => {
        localStorage.setItem(this.authenticatedSectionKey, dataResponse.token);
        this.isLoggedIn.set(true);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.authenticatedSectionKey);
    this.isLoggedIn.set(false);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.authenticatedSectionKey) !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.authenticatedSectionKey);
  }
}
