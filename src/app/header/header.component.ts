import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  displayUser = false;
  displayUserGroup = false;
  public loggedIn=false;

  constructor(public router:Router, private authService: AuthService, public loginService:LoginService, private route:ActivatedRoute){
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  listadminUser() {
    this.displayUser = !this.displayUser;
    this.router.navigateByUrl('/admin/users');

  }
  listhelpdeskUser() {
    this.displayUser = !this.displayUser;
    this.router.navigateByUrl('/helpdesk/users');
  }

  loginAs(isAdmin: boolean){
    this.router.navigateByUrl('login', {
      state: {
        isAdmin
      }
    })
  }

  
  listadminUserGroup() {
    
    this.displayUserGroup = !this.displayUserGroup;
    this.router.navigateByUrl('/admin/usergroups');
  }

  logout() {  
   
    this.authService.clear();  
    this.router.navigate(['/home']);
   
  }  

  ngOnInit(): void {
    // this.loggedIn=this.loginService.isLoggedIn();
    
  }

  // logoutUser(){
  //   this.loginService.logout();
  //   location.reload();
  // }

  


}
