import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { CreateProjectRequest, Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly apiUrl = `${environment.apiUrl}/projects`;

  projects = signal<Project[]>([]);

  constructor(private http: HttpClient) {}

  loadProjects(): void {
    this.http.get<Project[]>(this.apiUrl).subscribe((dataResponse) => {
      this.projects.set(dataResponse);
    });
  }

  createProject(createProjectRequest: CreateProjectRequest): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, createProjectRequest).pipe(
      tap((dataResponse) => {
        this.projects.update((before) => [...before, dataResponse]);
      }),
    );
  }
}
