import { AppComponent } from './../../app.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup

  constructor(
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router,
    private appComponent:AppComponent
  ) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    })

  }

  register(){
    if(this.registerForm.valid){
       let registerModel = Object.assign({},this.registerForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.success(response.message,"Registered")
        this.router.navigate(['/login'])
        this.toastrService.info("You must log in")
        this.setIsAuthenticatedFalse()
      },responseError=>{
        this.toastrService.error("Something is wrong.","Could not registered")
      })
    }
    else{
      this.toastrService.error("All filed must be entered","Error")
    }
  }
  
  setIsAuthenticatedFalse(){
    this.appComponent.isAuthenticated = false
  }

}
