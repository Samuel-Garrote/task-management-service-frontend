import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.errorMessage.set(null);

    const registerRequest = {
      username: this.registerForm.value.username!,
      password: this.registerForm.value.password!,
    };

    this.authService.register(registerRequest).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.errorMessage.set('That username is already taken.'),
    });
  }
}
