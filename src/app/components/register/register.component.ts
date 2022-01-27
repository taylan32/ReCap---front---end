import { CustomerService } from './../../services/customer.service';
import { NaviComponent } from './../navi/navi.component';
import { ProfileComponent } from './../profile/profile.component';
import { UserService } from './../../services/user.service';
import { RegisterModel } from './../../models/registerModel';
import { AppComponent } from './../../app.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  isAuthorized: boolean = false



  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private appComponent: AppComponent,
    private userService: UserService,
    private customerService: CustomerService
  ) { }


  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required]
    })

  }

  register() {
    if (this.registerForm.valid) {
      let registerModel: RegisterModel = Object.assign({}, this.registerForm.value)
      let mail = this.registerForm.value.email
      if (mail !== null) {
        this.checkIfAuthorized(mail)
      }
      if (this.isAuthorized === true) { // if user is authorized
        this.authService.register(registerModel).subscribe(response => {
          this.toastrService.success(response.message, "Registered")
          this.router.navigate(['/login'])
          this.setIsAuthenticatedFalse()
          this.toastrService.info("You must log in")
        }, responseError => {
          this.toastrService.error("Something is wrong.", "Could not registered")
        })
      }
      else { // add as a customer
        this.authService.register(registerModel).subscribe(response => {
          this.toastrService.info(response.message)
        }, responseError => {
          this.toastrService.error("Something is wrong.", "Could not registered")
        })
        // let userId: number = this.getUserId(registerModel.email)
        // console.log(registerModel)
        // console.log(userId)
        this.getUserId(registerModel.email)
       
      }

    }
    else {
      this.toastrService.error("All filed must be entered", "Error")
    }


  }

  setIsAuthenticatedFalse() {
    this.appComponent.isAuthenticated = false
  }

  checkIfAuthorized(email: string) {
    if (email.includes("@alparslanrent.com")) {
      this.isAuthorized = true
    }
    else {
      this.isAuthorized = false
    }
  }

  getUserId(email: string) {
    console.log(email)
    this.userService.getByEmail(email).subscribe(response => {
      console.log(response)
      let id: number = response.data.id
      this.customerService.setUserId(id)
      this.router.navigate(['/profile/' + id])
    })
  }

}
