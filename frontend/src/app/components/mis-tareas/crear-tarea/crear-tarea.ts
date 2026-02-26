import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-tarea',
  imports: [ReactiveFormsModule],
  templateUrl: './crear-tarea.html',
  styleUrl: './crear-tarea.css',
})
export class CrearTarea {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;

  constructor(private cd: ChangeDetectorRef) {
    this.miForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      priority: new FormControl('', [
        Validators.required
      ]),
      hours: new FormControl('', [
        Validators.required
      ])
    }, []);
  }

  get title() {
    return this.miForm.get('title');
  }

  get content() {
    return this.miForm.get('content');
  }

  get priority() {
    return this.miForm.get('priority');
  }

  get hours() {
    return this.miForm.get('hours');
  }

  cargarDatos(){
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
  }
}
