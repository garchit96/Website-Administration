import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './guards/auth.guard';

import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { UserGroupsComponent } from './user-groups/user-groups.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    canActivate:[AuthGuard],
  
  },
  {
    path:'home', 
    component:HomeComponent,
    canActivate:[AuthGuard],
  
  },
  {
    path:'forbidden', 
    component:ForbiddenComponent,
    canActivate:[AuthGuard],
  
  },
  {
    path:'about-us', 
    component:AboutUsComponent,
    canActivate:[AuthGuard],
  
  },
  {
    path:'admin', 
    component:AdminComponent, 
    canActivate:[AuthGuard],
    // data:{roles:['Admin']},
    children: [
      { path: 'users', component: UsersComponent },
      {path:'usergroups', component:UserGroupsComponent}
    ]
  },
 
  {
    path:'helpdesk', 
    component:HelpdeskComponent,
    canActivate:[AuthGuard],
    //  data:{roles:['Helpdesk']},
    children: [
      { path: 'users', component: UsersComponent }
    ]
  },
  {
    path:'',
    redirectTo:"home",
    pathMatch:"full" 
  },
  {
    path:'**',
    redirectTo:"home",
  },
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
