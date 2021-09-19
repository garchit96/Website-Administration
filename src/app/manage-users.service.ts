import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { Users } from './User';
import { map } from 'rxjs/operators';
import { userModel } from './userModel';



// const httpOption = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//   })
// }
@Injectable(
  {
    providedIn: 'root'
  }
)
export class ManageUsersService {

  constructor(private httpClient: HttpClient) { }


  viewAllUser(): Observable<Users[]> {
    const userUrl = 'http://localhost:9090/service/users';
    // return this.httpClient.get<Users>(userUrl);//return observable
    return this.httpClient.get<Users[]>(userUrl);
  }

  deleteUser(id: number): Observable<any> {
    const userUrl = 'http://localhost:9090/service/users/deleteUser';
    return this.httpClient.delete(userUrl + '/' + id)
  
  }

  createUser(user: userModel): Observable<Users> {
    const userUrl = 'http://localhost:9090/service/users/addUser';
    return this.httpClient.post<Users>(userUrl, user);//return observable
  }

  viewUserById(id: number): Observable<any> {
    const userUrl = 'http://localhost:9090/service/users' + id;
    return this.httpClient.get<Users>(userUrl);//return observable
  }

  updateUser(data: any, id: number): Observable<Users> {
    const userUrl = 'http://localhost:9090/service/users/updateUser';
    return this.httpClient.put<Users>(userUrl + '/' + id, data);//return observable
  }
}


