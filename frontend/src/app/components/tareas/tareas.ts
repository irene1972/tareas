import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { choosePriority, isAdmin, isLogged } from '../../shared/utils/funciones';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tareas',
  imports: [RouterLink],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class Tareas {
  mensaje:string='';
  tipo:boolean=false;
  usuarioLogueado: any = {};
  isAdmin: any = false;

  @Input() titulo:string='';
  @Input() tareas:any[]=[];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(){
    if(isLogged()) this.usuarioLogueado=isLogged();
    if(isAdmin()) this.isAdmin=isAdmin();
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
