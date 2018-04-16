import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route : ActivatedRoute, private router : Router, private userService : UserService) { }

  ngOnInit() {
  }

  login(form : NgForm){
    let creds = {};
    creds['username'] =form.value['username'];
    creds['password'] =form.value['password'];
    this.userService.login(creds).subscribe( success => {
      if(localStorage.getItem('token')){
          this.router.navigate(['/']);
      }
      else
          alert(' Wrong Username/Passward ');
    });
  }
}
