import { Component, computed, inject, input } from '@angular/core';

import { Task } from '../../models/task.model';
import { ProjectService } from '../../service/project.service';
@Component({
  selector: 'app-task-card',
  standalone: true,
  templateUrl: './task-card.component.html',
})
export class TaskCardComponent {
  task = input.required<Task>();

  private projectService = inject(ProjectService);

  projectName = computed(() => {
    //computed: depende de una/s variables/s
    const foundProject = this.projectService.projects().find((p) => p.id === this.task().projectId);
    return foundProject ? foundProject.name : 'Unknown project';
  });
}
