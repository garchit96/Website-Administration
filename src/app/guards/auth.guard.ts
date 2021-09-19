import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  private guardedRoutes = ["admin","helpdesk"]

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentPath = route.url[0].path;
    console.log(JSON.stringify(route.url));
    if (this.authService.getToken()) {
      const currentRole = this.authService.getRoles()[0].roleName;
      switch (currentPath) {
        case "admin":
          if (currentRole === "Admin") {
            return true;
          } else {
            this.router.navigate(["/helpdesk"]);
            return false;
          }
        case "helpdesk":
          if (currentRole === "Helpdesk") {
            return true;
          } else {
            this.router.navigate(["/admin"]);
            return false;
          }

        default:
          this.router.navigate(["/admin"]);
          return false;
      }
 
    } else {
      if(this.guardedRoutes.includes(currentPath)){
        this.router.navigate(['/forbidden']);
        return false;
      } else {
        return true;
      }
    }
  }
}


// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService,
//     private router: Router,
//     private loginService: LoginService) { }  
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     if (this.authService.getToken() !== null) {
//       const roles = route.data['roles'] as Array<string>;
//       console.log(roles);
//       if (roles) {
//         const match = this.loginService.roleMatch(roles);
//         console.log(match);
//         if (match) {
//           return true;
//         } else {
//           this.router.navigate(['/forbidden']);
//           return false;
//         }
//       }
//     }

//     this.router.navigate(['/login']);
//     return false;
//   }
// }