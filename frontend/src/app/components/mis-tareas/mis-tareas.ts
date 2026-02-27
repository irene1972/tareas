import { ChangeDetectorRef, Component } from '@angular/core';
import { isLogged } from '../../shared/utils/funciones';
import { environment } from '../../../environments/environment';
import { Tareas } from '../tareas/tareas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-tareas',
  imports: [Tareas],
  templateUrl: './mis-tareas.html',
  styleUrl: './mis-tareas.css',
})
export class MisTareas {

  mensaje: string = '';
  tipo: boolean = false;
  tareas: any[] = [];
  usuarioLogueado: any = {};

  constructor(private cd: ChangeDetectorRef, private router: Router) { }

  async ngOnInit() {
    if (!isLogged()) this.router.navigate(['/login']);

    this.usuarioLogueado = isLogged();
    await fetch(`${environment.apiUrl}/tareas/listar`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          this.mensaje = data.error;
          return;
        }
        this.mensaje = data.mensaje;
        this.tipo = true;
        this.tareas = data.filter((tarea: any) => tarea.user_id === this.usuarioLogueado.id);
      })
      .catch()
      .finally(() => {
        this.cd.detectChanges();
      });

  }

}
