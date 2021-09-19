import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UsersComponent } from './users/users.component';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { SearchfilterPipe } from './searchfilter.pipe';
import { Searchfilter1Pipe } from './searchfilter1.pipe';
import { AuthInterceptor } from './guards/authInterceptor';
import { LoginService } from './services/login.service';
import { ForbiddenComponent } from './forbidden/forbidden.component';






@NgModule({
  declarations: [
    AppComponent,
    HelpdeskComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    UsersComponent,
    UserGroupsComponent,
    AdminComponent,
    SearchfilterPipe,
    Searchfilter1Pipe,
    ForbiddenComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [LoginService,AuthGuard, [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}]],
  bootstrap: [AppComponent]
})
export class AppModule { }
