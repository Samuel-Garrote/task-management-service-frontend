import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('task-management-service-frontend');

  private authService = inject(AuthService);
  private router = inject(Router);

  isLoggedIn = this.authService.isLoggedIn;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
