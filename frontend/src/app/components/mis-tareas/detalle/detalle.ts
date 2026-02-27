import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';
import { choosePriority, isLogged } from '../../../shared/utils/funciones';

@Component({
  selector: 'app-detalle',
  imports: [DatePipe],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {

  mensaje:string='';
  tipo:boolean=false;
  tarea:any={};
  priority:string='';

  constructor(private cd: ChangeDetectorRef,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    if (!isLogged()) this.router.navigate(['/login']);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log(id);
      fetch(`${environment.apiUrl}/tareas/obtener-tarea/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.error) {
            this.mensaje = data.error;
            return;
          }
          //this.mensaje = data.mensaje;
          //this.tipo = true;
          this.tarea=data;
          this.priority=choosePriority(this.tarea.priority);
        })
        .catch()
        .finally(() => {
          this.cd.detectChanges();
        });


    });
  }
}
