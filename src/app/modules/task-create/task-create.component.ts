import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  habilidades: string[] = [];
  newSkill: string = '';
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.taskForm = this.fb.group({
      nombreTarea: ['', Validators.required],
      fechaLimite: ['', Validators.required],
      completed: [false, Validators.required],
      personas: this.fb.array([], this.uniqueNamesValidator())
    });
  }

  get personas(): FormArray {
    return this.taskForm.get('personas') as FormArray;
  }

  public addPerson(): void {
    const personForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(19)]],
      habilidades: this.fb.array([],this.atLeastOneSkillValidator)
    });
    this.personas.push(personForm);
    this.taskForm.get('personas')?.updateValueAndValidity();
  }

  public addSkills(index: number): void {
    const habilidades = this.personas.at(index).get('habilidades') as FormArray;
    if (this.newSkill.trim()) {
      habilidades.push(new FormControl(this.newSkill));
      this.newSkill = '';
    }
  }

  public deleteSkill(indexPersona: number, indexHabilidad: number): void {
    const habilidades = this.personas.at(indexPersona).get('habilidades') as FormArray;
    habilidades.removeAt(indexHabilidad);
  }

  deletePerson(index: number): void {
    this.personas.removeAt(index);
  }

  uniqueNamesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const personasArray = control as FormArray;
    const names = personasArray.controls.map(control => control.get('nombre')?.value);
    const hasDuplicates = names.length !== new Set(names).size;

    return hasDuplicates ? { duplicateNames: true } : null;
    };
  }

  atLeastOneSkillValidator(control: AbstractControl): ValidationErrors | null {
    const habilidades = control.value;
    return habilidades.length === 0 ? { noSkills: true } : null;
  }

  public saveTask(): void {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value);
      this.router.navigate(['tasks/list'])
    }
  }
}
