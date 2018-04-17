import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
    
  constructor( private http : Http) { }
    baseUrl : 'http://localhost:8080/';
    login(creds) {
      let url = this.baseUrl + 'login';
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', creds.username);
        urlSearchParams.append('password', creds.password);
        let body = urlSearchParams.toString();
        return this.http.post('http://localhost:8080/login', body, {
            headers: headers
        })
        .map(res => {
            let resp = res.json();
            if (resp.success && resp.token) {
                localStorage.setItem('token', resp.token);
                localStorage.setItem('user', JSON.stringify(resp.user));
            }
            return resp;
        });
    } 

    logOut() {
      localStorage.clear();
  }
  ////////////////////////////
  //communication
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  emitChange(change: any) {
      this.emitChangeSource.next(change);
  }
}
