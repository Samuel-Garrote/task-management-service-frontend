import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage.set(null);

    const loginRequest = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };

    this.authService.login(loginRequest).subscribe({
      next: () => this.router.navigate(['/projects']),
      error: () => this.errorMessage.set('Incorrect username or password.'),
    });
  }
}
