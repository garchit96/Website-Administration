import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageUsersService } from '../manage-users.service';
import { Users } from '../User';

import { FormsModule } from '@angular/forms'
import { userModel } from '../userModel';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGroups } from '../usergroups';
import { ManageUserGroupsService } from '../manage-user-groups.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  formValue: FormGroup;
  userObj: userModel;
  allUser: Users[];
  showAdd = false;
  showUpdate = true;
  searchValue: string;
  lock = false;
  groups: UserGroups[] = []

  constructor(private readonly formBuilder: FormBuilder, private manageuser: ManageUsersService,private manageusergroup: ManageUserGroupsService,
     public router: Router, private route: ActivatedRoute,) { }

  get email() {
    return this.formValue.get('email')
  }

  get address() {
    return this.formValue.get('address')
  }

  get name() {
    return this.formValue.get('name')
  }
  

  get groupName() {
    return this.formValue.get('groupName')
  }


  ngOnInit() {
    this.manageusergroup.viewAllUserGroups().subscribe(data => this.groups = data);
    this.getAllUsers();
    this.formValue = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      // group_id: ['']
      groupName: ['']
    });


  }

  clickAddUser() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;

  }

  userLock(user) {
    user.lock = !user.lock;
  }

  addUser() {
    this.userObj = {
      name: this.formValue.value.name,
      email: this.formValue.value.email,
      address: this.formValue.value.address,
    }
    
    const groupName= this.formValue.value.groupName
    if (groupName) {
      this.userObj.usergroup = {
        // name: this.formValue.value.groupName,
        group_id: this.groups.find(g => g.name === groupName).group_id

      }
    }

    
    console.log(this.formValue.value, this.userObj)

    this.manageuser.createUser(this.userObj)
      .subscribe(res => {
        console.log(res);
        alert("User Added Successfully")
        this.formValue.reset();
        this.getAllUsers();
      })
  }

  getAllUsers() {
    this.manageuser.viewAllUser().subscribe((data: Users[]) => {
      this.allUser = data;
     
    });
  }
  deleteUser(id: number) {
    if (confirm('Are you sure to delete??')) {
      this.manageuser.deleteUser(id).subscribe(res => {
        console.log(res)
      });
      setTimeout(() => {
        this.getAllUsers();
      }, 1000);
    }
  }


  editUser(user) {
    this.showAdd = false;
    this.showUpdate = true;
    this.userObj = {
      ...user
    }
    console.log(this.userObj);
    this.formValue.controls['name'].setValue(user.name)
    this.formValue.controls['email'].setValue(user.email)
    this.formValue.controls['address'].setValue(user.address)
    this.formValue.controls['groupName'].setValue(user.usergroup.name)

  }

  updateUser() {
    this.userObj.name = this.formValue.value.name;
    this.userObj.email = this.formValue.value.email;
    this.userObj.address = this.formValue.value.address;
    
    const groupName= this.formValue.value.groupName
    if (groupName) {
      this.userObj.usergroup = {
        
        group_id: this.groups.find(g => g.name === groupName).group_id

      }
    }
    else {
      this.userObj.usergroup = null;
    }

    this.manageuser.updateUser(this.userObj, this.userObj.user_id)
      .subscribe(data => {
        // this.userObj = null;
        alert("Updated Successfully!!");
        this.formValue.reset();
        this.getAllUsers();
      })
  }

}
