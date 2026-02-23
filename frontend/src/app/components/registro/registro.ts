import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;

  constructor(private cd: ChangeDetectorRef, private router: Router) {
    this.miForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    }, []);
  }

  get nombre() {
    return this.miForm.get('nombre');
  }

  get apellidos() {
    return this.miForm.get('apellidos');
  }

  get email() {
    return this.miForm.get('email');
  }

  get password() {
    return this.miForm.get('password');
  }

  cargarDatos() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    //console.log(this.miForm.value);
  }
}
