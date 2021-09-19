import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageUsersService } from '../manage-users.service';
import { AuthService } from '../services/auth.service';
import { Users } from '../User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title = 'Admin';
  constructor(private router: Router, private authService: AuthService, private manageuser: ManageUsersService) { }
  
  ngOnInit(): void {
    
  }

 

}
