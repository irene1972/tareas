import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { isAdmin, isLogged } from '../../../shared/utils/funciones';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-tarea',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-tarea.html',
  styleUrl: './editar-tarea.css',
})
export class EditarTarea {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  usuarioLogueado: any = {};
  isAdmin:any=false;
  tarea:any={};
  tarea_id:string | null='';

  constructor(private cd: ChangeDetectorRef,private router: Router,private route: ActivatedRoute) {
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

  ngOnInit() {
    this.usuarioLogueado = isLogged();
    this.isAdmin=isAdmin();
    this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          console.log(id);
          this.tarea_id=id;
          fetch(`${environment.apiUrl}/tareas/obtener-tarea/${id}`)
            .then(response => response.json())
            .then(data => {
              console.log(data);
              if (data.error) {
                this.mensaje = data.error;
                return;
              }
              
              this.tarea=data;
              console.log(this.tarea.user_id);
              console.log(this.usuarioLogueado.id);
              console.log(this.isAdmin);
              if(!(this.tarea.user_id === this.usuarioLogueado.id || this.isAdmin)){
                this.router.navigate(['/home']);
              }

              this.miForm.get('title')?.setValue(this.tarea.title);
              this.miForm.get('content')?.setValue(this.tarea.content);
              this.miForm.get('priority')?.setValue(this.tarea.priority);
              this.miForm.get('hours')?.setValue(this.tarea.hours);
              
            })
            .catch()
            .finally(() => {
              this.cd.detectChanges();
            });
    
    
        });
  }

  cargarDatos() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    this.miForm.value.user_id = this.tarea.user_id;
    console.log(this.miForm.value);

    fetch(`${environment.apiUrl}/tareas/editar/${this.tarea_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(this.miForm.value)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          this.mensaje = data.error;
          return;
        }
        this.mensaje = data.mensaje;
        this.tipo = true;
        this.miForm.reset();
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
}
