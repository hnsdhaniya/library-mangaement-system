import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BooklistComponent } from './pages/booklist/booklist.component';
import { StudentlistComponent } from './pages/studentlist/studentlist.component';
import { HttpClientModule } from '@angular/common/http';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { AddBooksComponent } from './pages/add-books/add-books.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    SidenavComponent,
    BooklistComponent,
    StudentlistComponent,
    AddStudentComponent,
    AddBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
