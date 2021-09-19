import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Users } from '../User';
import { UserLogin } from 'src/app/login';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  message: string;
 
  isSubmitted = false;


  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
 
  ngOnInit(): void {
    console.log(history);
    this.loginFormGroup = this.formBuilder.group({ 
      userName: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
     
  }


  get f() { return this.loginFormGroup.controls; }
  
  login() {
    this.isSubmitted = true;
    this.loginService.login(this.loginFormGroup.value).subscribe(
      (response: any) => {
        this.authService.setRoles(response.user.role);
        this.authService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/helpdesk']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onReset() {
    this.isSubmitted = false;
    this.loginFormGroup.reset();
}

}








