import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course/course.component';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './services/user.service';

const appRoutes : Routes =[
  { path : '', component : CourseComponent},
    { path : 'login', component : LoginComponent}
    
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    CourseListComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
