import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BooklistComponent } from './pages/booklist/booklist.component';
import { StudentlistComponent } from './pages/studentlist/studentlist.component';
import { RegistrationComponent } from './registration/registration.component';
import { SidenavComponent } from './sidenav/sidenav.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegistrationComponent
  },
  {
    path: 'sidenav', component: SidenavComponent
  },
  {
    path: 'books', component: BooklistComponent
  },
  {
    path: 'students', component: StudentlistComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
