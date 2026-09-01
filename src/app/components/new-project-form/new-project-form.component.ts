import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProjectService } from '../../service/project.service';
@Component({
  selector: 'app-new-project-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-project-form.component.html',
})
export class NewProjectFormComponent {
  private projectService = inject(ProjectService);
  private formBuilder = inject(FormBuilder);

  errorMessage = signal<string | null>(null);

  newProjectForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.newProjectForm.invalid) {
      return;
    }

    this.errorMessage.set(null);

    const createProjectRequest = {
      name: this.newProjectForm.value.name!,
    };

    this.projectService.createProject(createProjectRequest).subscribe({
      next: () => this.newProjectForm.reset(),
      error: () => this.errorMessage.set('Could not create the project. Try again.'),
    });
  }
}
