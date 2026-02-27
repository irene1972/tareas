import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { C404 } from './components/c404/c404';
import { Registro } from './components/registro/registro';
import { Login } from './components/login/login';
import { Confirmar } from './components/confirmar/confirmar';
import { MisTareas } from './components/mis-tareas/mis-tareas';
import { Detalle } from './components/mis-tareas/detalle/detalle';
import { CrearTarea } from './components/mis-tareas/crear-tarea/crear-tarea';
import { EditarTarea } from './components/mis-tareas/editar-tarea/editar-tarea';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Home},
    {path:'mis-tareas',component:MisTareas},
    {path:'detalle/:id',component:Detalle},
    {path:'editar/:id',component:EditarTarea},
    {path:'crear-tarea',component:CrearTarea},
    {path:'registro',component:Registro},
    {path:'login',component:Login},
    {path:'confirmar/:token',component:Confirmar},
    {path:'**',component:C404}
];
