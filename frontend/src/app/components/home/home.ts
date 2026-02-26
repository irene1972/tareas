import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  mensaje:string='';
  tipo:boolean=false;

  constructor(private cd: ChangeDetectorRef,private route: ActivatedRoute) { }
  
  ngOnInit(): void {
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
  }
}
