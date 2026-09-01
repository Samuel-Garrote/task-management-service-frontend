import { Component, inject, input, OnInit } from '@angular/core';

import { ProjectService } from '../../service/project.service';
import { TaskService } from '../../service/task.service';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  projectId = input.required<number>();

  private taskService = inject(TaskService);
  private projectService = inject(ProjectService);

  tasks = this.taskService.tasks;

  ngOnInit(): void {
    this.taskService.findByProjectId(this.projectId());
    this.projectService.loadProjects();
  }
}
