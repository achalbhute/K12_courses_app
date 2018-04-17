import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showButton = false;
  constructor(private router : Router, private route : ActivatedRoute, private userService : UserService ) {
      userService.changeEmitted$.subscribe( res =>{
        if( res.loggedIn){
          this.showButton = true;
        }
      });
      window.onbeforeunload = function(e) {
        localStorage.clear();
      };  
   }

  ngOnInit() {
  }

  logout (){
    this.userService.logOut();
    this.showButton= false;
    this.router.navigate(['/login']);
  }
}
