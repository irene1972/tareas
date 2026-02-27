import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { isLogged } from '../../shared/utils/funciones';
import { Tareas } from '../tareas/tareas';

@Component({
  selector: 'app-home',
  imports: [Tareas],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  mensaje: string = '';
  tipo: boolean = false;
  tareas: any[] = [];

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      console.log(code);
      switch (code) {
        case "1":
          this.mensaje = 'El usuario se ha logueado correctamente';
          this.tipo = true;
          this.cd.detectChanges();
          break;
      }

    });

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
          this.tareas = data;
        })
        .catch()
        .finally(() => {
          this.cd.detectChanges();
        });
    }
  }
}
