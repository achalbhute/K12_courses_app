import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
//import { Observable } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    
  constructor( private http : Http) { }
    baseUrl : 'http://localhost:8080/';
    login(creds) {
      let url = this.baseUrl + 'login';
      let headers = new Headers();
      headers.append('Cntent-Type', 'application/x-www-form-urlencoded');
      let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', creds.username);
        urlSearchParams.append('password', creds.password);
        let body = urlSearchParams.toString();
        return this.http.post(url, body, {
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
}
