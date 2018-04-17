import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  show : boolean = true;
  courses : {};

  constructor(private route: ActivatedRoute,private router: Router,private courseService: CourseService) {
    if(!localStorage.getItem('token')){
      this.router.navigate(['/login']);
    }
    let user = JSON.parse(localStorage.getItem('user'));
    if(user && user.role == 'student'){
      this.show=false;
    }
    this.courseService.getCourse(null).subscribe(course => {
              if(course && course.length >0){
                this.courses = course;
                this.courseService.selectedCourseId= course[0].id;
              }
            });
        }
  ngOnInit() {
  }

  
  Add(){
    this.router.navigate(['/add']);
  }

}