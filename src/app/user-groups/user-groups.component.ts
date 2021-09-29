import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManageUserGroupsService } from '../manage-user-groups.service';
import { ManageUsersService } from '../manage-users.service';
import { Users } from '../User';

import { userGroupModel } from '../userGroupModel';
import { UserGroups } from '../usergroups';


@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})
export class UserGroupsComponent implements OnInit {
  formValue :FormGroup;
  userGroupObj :userGroupModel;
  allUserGroups:UserGroups[];
  showAdd=false;
  showUpdate=true;
  searchValue1;
  searchValue;;
  lock=false;
  // manageuser: any;
  // allUser: any[];
  allUser:Users[];

  constructor(private readonly formBuilder:FormBuilder, private manageusergroups: ManageUserGroupsService, private manageuser: ManageUsersService, private router: Router, ) { }

  get email(){
    return this.formValue.get('email')
  }

  get name(){
    return this.formValue.get('name')
  }

  ngOnInit(): void {
    this.getAllUserGroups();
   
    this.formValue = this.formBuilder.group({
      // userId: ['', [Validators.required]],
      name: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      // created_on:['',[Validators.required]]
      // Area: ['', [Validators.required]],
      // UsersCount: ['', [Validators.required]]

    });
  }

  clickAddUserGroup(){
    this.formValue.reset();
   this.showAdd=true;
   this.showUpdate=false;

  }

  userGroupLock(usergroup){
    usergroup.lock = !usergroup.lock;
  }

  addUserGroup(){
    this.userGroupObj = {
      name: this.formValue.value.name,
      email: this.formValue.value.email
    }
    // this.userGroupObj.name=this.formValue.value.name;
    // this.userGroupObj.email=this.formValue.value.email;
  
    this.manageusergroups.createUserGroup(this.userGroupObj)
    .subscribe(res=>{
      console.log(res);
      alert("UserGroup Added Successfully")
      this.formValue.reset();
      this.getAllUserGroups();
    })
  }

  getAllUserGroups(){
    this.manageusergroups.viewAllUserGroups().subscribe((data:UserGroups[])=>{
        this.allUserGroups=data;
      });
  }
  getAllGroupUsers(id:number){
    this.manageusergroups.viewAllGroupUsers(id).subscribe((data:Users[])=>{
        this.allUser=data;
      });
  }

  deleteUserGroup(id:number){
    if(confirm('Are you sure to delete??')){
      this.manageusergroups.deleteUserGroup(id).subscribe((data:UserGroups)=>{
        
      });

        setTimeout(() => {
          this.getAllUserGroups();
        }, 1000);
    }

  }

  editUserGroup(userGroup){
    this.showAdd=false;
   this.showUpdate=true;
   this.userGroupObj={
     ...userGroup
   }
    // this.userGroupObj.group_id=userGroup.group_id;
    this.formValue.controls['name'].setValue(userGroup.name)
    this.formValue.controls['email'].setValue(userGroup.email)
    
    }

    updateUserGroup(){
      this.userGroupObj.name=this.formValue.value.name;
      this.userGroupObj.email=this.formValue.value.email;

      this.manageusergroups.updateUserGroup(this.userGroupObj,this.userGroupObj.group_id)
      .subscribe(data=>{
        alert("Updated Successfully!!");
        this.formValue.reset();

        this.getAllUserGroups();
      })
    }

    deleteUser(id: number) {
      if (confirm('Are you sure to delete??')) {
        this.manageuser.deleteUser(id).subscribe(res => {
          console.log(res)
          // alert("User Deleted!!")
          // this.getAllUsers();
        });
        setTimeout(() => {
          this.getAllGroupUsers(id);
        }, 1000);
      }
  
  
    }
  }
