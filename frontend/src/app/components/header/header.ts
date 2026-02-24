import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { isLogged } from '../../shared/utils/funciones';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  isLogged: boolean = false;
  usuarioLogueado:any={};

  constructor(private cd: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    if (isLogged()) {
      this.isLogged = true;
      this.usuarioLogueado = isLogged();
      console.log(this.usuarioLogueado);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioTareas');
    this.router.navigate(['/login']);
  }
}
