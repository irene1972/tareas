import { ChangeDetectorRef, Component } from '@angular/core';
import { isLogged } from '../../shared/utils/funciones';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mis-tareas',
  imports: [],
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
}
