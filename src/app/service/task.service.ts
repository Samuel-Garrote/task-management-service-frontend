import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { CreateTaskRequest, Task, UpdateTaskRequest } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly apiUrl = `${environment.apiUrl}/tasks`;

  tasks = signal<Task[]>([]);

  constructor(private http: HttpClient) {}

  createTask(createTaskRequest: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, createTaskRequest).pipe(
      tap((dataResponse) => {
        this.tasks.update((before) => [...before, dataResponse]);
      }),
    );
  }

  findById(id: number): void {
    this.http.get<Task>(`${this.apiUrl}/${id}`).subscribe((dataResponse) => {
      this.tasks.update((before) => [...before.filter((t) => t.id !== id), dataResponse]);
    });
  }

  updateTask(id: number, updateTaskRequest: UpdateTaskRequest): void {
    this.http.put<Task>(`${this.apiUrl}/${id}`, updateTaskRequest).subscribe((dataResponse) => {
      this.tasks.update((before) => before.map((t) => (t.id === id ? dataResponse : t)));
    });
  }

  deleteTask(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => {
      this.tasks.update((before) => before.filter((t) => t.id !== id));
    });
  }

  findByProjectId(projectId: number): void {
    this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}`).subscribe((dataResponse) => {
      this.tasks.set(dataResponse);
    });
  }
}
