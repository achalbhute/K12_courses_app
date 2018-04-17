import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseService {
  
  selectedCourseId =1;
  constructor(private http: Http) { 
    }
    getCourse( id )
    {
      let url = 'http://localhost:8080/';
      let headers = this.makeHeader();
      if(id){
        url = url + id;
      }
        return this.http.get('http://localhost:8080/'+id, {
          headers: headers})
        .map(res => res.json());
    }
  
    postCourse(course)
    {
      let url = 'http://localhost:8080/';
      let headers =  this.makeHeader();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('coursename', course.coursename);
      urlSearchParams.append('details', course.details);
      let body = urlSearchParams.toString()
      return this.http.post(url, body,{
          headers: headers})
        .map(res => res.json());
    }
  
    enroll(id, studentId)
    {
      let url = 'http://localhost:8080/';
      let headers =  this.makeHeader();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      if(id){
        url = url + id;
      }
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('student_id', studentId);
      let body = urlSearchParams.toString()
        return this.http.patch(url,body, {
          headers: headers})
        .map(res => res.json());
    }
  
    makeHeader()
    {
      let headers = new Headers();
      const token = localStorage.getItem('token');
      if(token){
        headers.append('x-access-token',token );
      }
      return headers;
    }
  }