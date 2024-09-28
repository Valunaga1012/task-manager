import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './modules/task-list/task-list.component';
import { TaskCreateComponent } from './modules/task-create/task-create.component';

const routes: Routes = [
  {
    path: 'tasks',
    children: [
      { path: 'list', component: TaskListComponent },
      { path: 'create', component: TaskCreateComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'tasks/list', pathMatch: 'full' },
  { path: '**', redirectTo: 'tasks/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
