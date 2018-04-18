import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private route : ActivatedRoute, private router : Router, private userService : UserService) { }

  ngOnInit() {
  }

  changePassword(form : NgForm){
    let user = {};
    user['username'] =form.value['username'];
    user['oldpassword'] =form.value['oldpassword'];
    user['newpassword'] =form.value['newpassword'];
    this.userService.changePassword(user).subscribe(success => {
      if(success.success)
        alert('Password Changed!');
        else
        alert('Password not matched');
        this.Back();
    });
}

Back() {
  this.router.navigate(['/']);
}

}
