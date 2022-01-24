import { AppComponent } from './../../app.component';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup 
  constructor(private formBuilder:FormBuilder, 
    private toastrService:ToastrService,
    private authService:AuthService,
    private appComponent:AppComponent) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })

  }

  login(){
    console.log(this.loginForm.valid)
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        localStorage.setItem("token",response.data.token)
      },responseError=>{
        this.toastrService.error(responseError)
      })
     
    }
  }

  setAuthTrue(){
    this.appComponent.isAuthenticated=true
  }

}
