import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProjectService } from '../../service/project.service';
@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent implements OnInit {
  private projectService = inject(ProjectService);

  projects = this.projectService.projects;

  ngOnInit(): void {
    this.projectService.loadProjects();
  }
}
