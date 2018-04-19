import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  showE: boolean = true;
  showL : boolean = false;
  showStudents : boolean = false;
  students : {};
  course: {};
  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService, private ref: ChangeDetectorRef, private userService : UserService) {
      if (!localStorage.getItem('token')) {
          this.router.navigate(['/login']);
      }
      
      let id = this.route.snapshot.paramMap.get('id');
      this.courseService.getCourse(id).subscribe(course => {
          this.course = course;
      });

      let user = JSON.parse(localStorage.getItem('user'));
     if (user && user.role == 'admin') {
        this.showStudents = true;
        this.getStudents();
    } else 
      if (user && user.courses[0].id == id) {
          this.showE = false;
          this.showL = true;
      }
     

  }

  ngOnInit() {
  }

  enroll() {
      let id = this.route.snapshot.paramMap.get('id');
      let user = JSON.parse(localStorage.getItem('user'));
      this.courseService.enroll(id, user.id).subscribe(success => {
          alert('Course Enrolled');
          this.router.navigate(['/']);
      });
  }

  leave() {
    let id = this.route.snapshot.paramMap.get('id');
    let user = JSON.parse(localStorage.getItem('user'));
    this.courseService.leave(id, user.id).subscribe(success => {
        alert('Course leaved');
        this.router.navigate(['/']);
    });
}

    getStudents(){
        this.userService.getStudents().subscribe(students => {
            if(students && students.length >0){
              this.students = students;
            }
          });
    }

Back() {
  this.router.navigate(['/']);
}

}
