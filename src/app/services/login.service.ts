import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://localhost:9999';
  
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private http:HttpClient,private authService: AuthService) { }

  public login(loginData) {
    return this.http.post(this.baseUrl + '/authenticate', loginData, 
    // telling that this request dont need any authentication
    {
      headers: this.requestHeader,
    });
  }

  public forAdmin() {
    return this.http.get(this.baseUrl + '/forAdmin', {
      responseType: 'text',
    });
  }

  public forHelpdesk() {
    return this.http.get(this.baseUrl + '/forHelpdesk', {
      responseType: 'text',
    });
  }


  public roleMatch(allowedRoles: string[]): boolean {
    const userRoles: any[] = this.authService.getRoles()
    const userRoleNames = userRoles ? userRoles.map(role => role.roleName) : [];
    // console.log('userRoles', userRoles);
    // console.log('userRoleName', JSON.stringify(userRoleNames));
    // console.log('allowedRoles', allowedRoles);
    return allowedRoles.some(role => userRoleNames.includes(role));
  }
}
