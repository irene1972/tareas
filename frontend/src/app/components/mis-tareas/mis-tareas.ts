import { ChangeDetectorRef, Component } from '@angular/core';
import { choosePriority, isLogged } from '../../shared/utils/funciones';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-tareas',
  imports: [RouterLink],
  templateUrl: './mis-tareas.html',
  styleUrl: './mis-tareas.css',
})
export class MisTareas {

  mensaje:string='';
  tipo:boolean=false;
  tareas:any[]=[];

  constructor(private cd: ChangeDetectorRef) { }

  async ngOnInit() {
    if (isLogged()) {
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
          this.tareas=data;
        })
        .catch()
        .finally(() => {
          this.cd.detectChanges();
        });
    }
  }

  chPriority(priority:string){
    return choosePriority(priority);
  }

  async borrarTarea(id:number){
    console.log(id);

    await fetch(`${environment.apiUrl}/tareas/eliminar/${id}`,{
      method:'DELETE'
    })
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          if (data.error) {
            this.mensaje = data.error;
            return;
          }
          this.mensaje = data.mensaje;
          this.tipo = true;
          location.reload();
        })
        .catch()
        .finally(() => {
          this.cd.detectChanges();
        });
  }
}
