import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JoinByCommaPipe } from 'src/app/core/pipes/join-by-comma.pipe';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  standalone: true,
  imports:[RouterModule, CommonModule, JoinByCommaPipe],
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  taskList: Array<any> = [];
  activeFilter: 'all' | 'completed' | 'pending' = 'all';

  constructor(private taskService: TaskService) {
    effect(()=> this.getTask()
    )
  }

  ngOnInit(): void {
    this.getTask();
  }

  toggleComplete(task: any) {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
  }

  getTask() {
    this.taskList = this.taskService.task();
  }

  deletePerson(task: any): void {
    this.taskService.removeTask(task);
  }

  setActiveFilter(filter: 'all' | 'completed' | 'pending') {
    this.activeFilter = filter;
    this.filteredTasks;
  }

  get filteredTasks() {
    if (this.activeFilter === 'completed') {
      return this.taskList.filter(task => task.completed);
    } else if (this.activeFilter === 'pending') {
      return this.taskList.filter(task => !task.completed);
    }
    return this.taskList;
  }

}
