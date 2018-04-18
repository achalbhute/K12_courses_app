import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course/course.component';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './services/user.service';
import { CourseService } from './services/course.service';
import { PasswordComponent} from './password/password.component';

const appRoutes : Routes =[
  { path : '', component : CourseListComponent},
    { path : 'login', component : LoginComponent},
    { path : 'changePassword', component : PasswordComponent},
    { path : ':id', component : CourseComponent},
    // { path : 'add', component : LoginComponent},
    // { path : 'newCourse', component : CourseComponent},
    // { path : 'newStudent', component : CourseComponent},
  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    CourseListComponent,
    CourseComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [UserService, CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
