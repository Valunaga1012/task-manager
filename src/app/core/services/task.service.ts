import { Injectable, signal } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _task = signal<Task[]>([]);

  get task() {
    return this._task;
  }

  setTask(task: any) {
    this._task.set(task);
  }

  addTask(newTask: Task) {
    this._task.update(values=>{
      return [...values, newTask]
    })
  }

  updateTask(updatedTask: Task) {
    this._task.update(values => {
      return values.map(task => task.nombreTarea === updatedTask.nombreTarea ? updatedTask : task);
    });
  }

  removeTask(taskToRemove: any) {
    this._task.update(values => {
      return values.filter(task => task !== taskToRemove);
    });
  }
}
