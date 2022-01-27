import { ToastrService } from 'ngx-toastr';
import { Customer } from './../../models/customer';
import { CustomerService } from './../../services/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterModel } from './../../models/registerModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  companyNameForm:FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private customerService:CustomerService,
    private toastrService:ToastrService,
    private router:Router

   ) { }

  ngOnInit(): void {
    this.createCompanyNameForm()
  }

  createCompanyNameForm(){
    this.companyNameForm = this.formBuilder.group({
      companyName:["",Validators.required]
    })
  }

  addCustomer(){
    if(this.companyNameForm.valid){
      let name:string =this.companyNameForm.value
     //let customerModel:Customer ={id:0,userId:this.customerService.userId,companyName:name}
     let customerModel:Customer = Object.assign({},this.companyNameForm.value)
     customerModel.userId = this.customerService.userId
     console.log(customerModel)
     this.customerService.add(customerModel).subscribe(response=>{
       this.toastrService.success(response.message)
       this.router.navigate(['/cars'])
     })
    }
    else{

    }
  }

}
