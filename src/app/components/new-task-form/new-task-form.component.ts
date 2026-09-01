import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProjectService } from '../../service/project.service';
import { TaskService } from '../../service/task.service';
@Component({
  selector: 'app-new-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-task-form.component.html',
})
export class NewTaskFormComponent implements OnInit {
  private taskService = inject(TaskService);
  private projectService = inject(ProjectService);
  private formBuilder = inject(FormBuilder);

  projects = this.projectService.projects;
  errorMessage = signal<string | null>(null);

  newTaskForm = this.formBuilder.group({
    title: ['', Validators.required],
    projectId: [null as number | null, Validators.required],
  });

  ngOnInit(): void {
    this.projectService.loadProjects();
  }

  onSubmit(): void {
    if (this.newTaskForm.invalid) {
      return;
    }

    this.errorMessage.set(null);

    const createTaskRequest = {
      title: this.newTaskForm.value.title!,
      project: { id: this.newTaskForm.value.projectId! },
    };

    this.taskService.createTask(createTaskRequest).subscribe({
      next: () => this.newTaskForm.reset(),
      error: () => this.errorMessage.set('Could not create the task. Try again.'),
    });
  }
}
