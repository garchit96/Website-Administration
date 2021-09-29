import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from './User';
import { userGroupModel } from './userGroupModel';
import { UserGroups } from './usergroups';



const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}  
@Injectable({
  providedIn: 'root'
})
export class ManageUserGroupsService {

  constructor(private httpClient:HttpClient) { }

  
  
  viewAllUserGroups(): Observable<UserGroups[]>{
    const userGroupUrl='http://localhost:8082/service/usergroups';
    return this.httpClient.get<UserGroups[]>(userGroupUrl);
  }

  deleteUserGroup(id:number):Observable<any>{
    const userGroupUrl='http://localhost:8082/service/usergroups/removeUsergroup';
    return this.httpClient.delete<UserGroups>(userGroupUrl+'/'+id);//return observable
  }
  
  createUserGroup(usergroup:userGroupModel):Observable<UserGroups>{
    const userGroupUrl='http://localhost:8082/service/usergroups/addUsergroup';
    return this.httpClient.post<UserGroups>(userGroupUrl, usergroup);//return observable
  }

  // viewUserGroupById(id:number): Observable<UserGroups>{
  //   const userGroupUrl='http://localhost:9090/service/usergroups'+id;
  //   return this.httpClient.get<UserGroups>(userGroupUrl);//return observable
  // }
  

  updateUserGroup(data:any, id:number):Observable<UserGroups>{
    const userGroupUrl='http://localhost:8082/service/usergroups/updateUsergroup';
    return this.httpClient.put<UserGroups>(userGroupUrl + '/'+id, data);//return observable
  }

  viewAllGroupUsers(id:number):Observable<Users[]>{
    const userGroupUrl='http://localhost:8082/service/users/ofGroup';
    return this.httpClient.get<Users[]>(userGroupUrl+'/'+ id);
  }
}
