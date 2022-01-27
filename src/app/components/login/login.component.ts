import { AppComponent } from './../../app.component';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private appComponent: AppComponent,
    private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })

  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.info(response.message)
        localStorage.setItem("token", response.data.token)
      }, responseError => {
        this.toastrService.error(responseError)
      })
      this.appComponent.isAuthenticated = true
      this.router.navigate(['/cars'])
    }
    else{
      this.toastrService.error("Form is empty","Error")
    }
  }

  setIsAuthenticatedTrue(){
    this.appComponent.isAuthenticated = true
  }
  


}
