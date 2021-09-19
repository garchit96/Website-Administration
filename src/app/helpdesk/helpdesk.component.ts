import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.css']
})
export class HelpdeskComponent implements OnInit {
  title = 'HelpDesk';
  constructor(private router: Router, private authService: AuthService) { }
  // displayUser = false;
  // displayUserGroup = false;
 
  // listUser() {
  //   this.displayUser = !this.displayUser;
  //   this.router.navigateByUrl('/helpdesk/users');
  // }
  
  
  ngOnInit(): void {
   
  }

}
