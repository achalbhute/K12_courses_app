import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  showE: boolean = true;
  showL : boolean = false;
  course: {};
  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService, private ref: ChangeDetectorRef) {
      if (!localStorage.getItem('token')) {
          this.router.navigate(['/login']);
      }
      
      let id = this.route.snapshot.paramMap.get('id');
      this.courseService.getCourse(id).subscribe(course => {
          this.course = course;
      });

      let user = JSON.parse(localStorage.getItem('user'));
      if (user && user.courses.id == id) {
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
          this.Back();
      });
  }

  leave() {
    let id = this.route.snapshot.paramMap.get('id');
    let user = JSON.parse(localStorage.getItem('user'));
    this.courseService.enroll(id, user.id).subscribe(success => {
        alert('Course leaved');
        this.Back();
    });
}
Back() {
  this.router.navigate(['/']);
}

}
