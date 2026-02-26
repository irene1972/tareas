import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isLogged } from '../../../shared/utils/funciones';
import { environment } from '../../../../environments/environment';

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
  usuarioLogueado:any={};

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

  ngOnInit(){
    this.usuarioLogueado=isLogged();
  }

  cargarDatos(){
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    this.miForm.value.user_id=this.usuarioLogueado.id;
    console.log(this.miForm.value);

    fetch(`${environment.apiUrl}/tareas/crear`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(this.miForm.value)
    })
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        if (data.error) {
          this.mensaje = data.error;
          return;
        }
        this.mensaje = data.mensaje;
        this.tipo = true;
        this.miForm.reset();
      })
      .catch(error=>console.log(error))
      .finally(()=>{
        this.cd.detectChanges();
      });
  }
}
