import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseService {
  
  selectedCourseId =1;
  baseUrl = 'http://localhost:8080/';
  constructor(private http: Http) { 
    }
    getCourse( id )
    {
      let url = this.baseUrl;
      let headers = this.makeHeader();
      let user = JSON.parse(localStorage.getItem('user'));
      if(user){
        if(id){
          url = url + user.role + '/course/' + id;
        }
        else
        url = url + user.role + '/courses';
      }
        return this.http.get(url, {
          headers: headers})
        .map(res => res.json());
    }
  
    postCourse(course)
    {
      let url = this.baseUrl;
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
      let url = this.baseUrl ;
      let headers =  this.makeHeader();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let user = JSON.parse(localStorage.getItem('user'));      
      if(user){
        if(id){
          url = url + user.role + '/course/' + id;
        }
      }
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('student_id', studentId);
      let body = urlSearchParams.toString()
        return this.http.post(url,body, {
          headers: headers})
        .map(res => res.json());
    }

    leave(id, studentId)
    {
      let url = this.baseUrl ;
      let headers =  this.makeHeader();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let user = JSON.parse(localStorage.getItem('user'));      
      if(user){
        if(id){
          url = url + user.role + '/course/' + id +'/leave';
        }
      }
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('student_id', studentId);
      let body = urlSearchParams.toString()
        return this.http.delete(url,new RequestOptions({
          headers: headers,
          body: body
       }))
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