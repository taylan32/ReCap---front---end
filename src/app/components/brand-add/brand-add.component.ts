import { Brand } from 'src/app/models/brand';
import { BrandService } from './../../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup
  constructor(
    private toastrService:ToastrService, 
    private formBuilder:FormBuilder,
    private brandService:BrandService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.createBrandAddForm()
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      name:["",Validators.required]
    })
  }

  addBrand(){
    if(this.brandAddForm.valid){
      let brandModel:Brand = Object.assign({},this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(response=>{
        this.toastrService.success(response.message)
        this.toastrService.info("You are being directed to home page","Redirecting")
        this.router.navigate(['/'])
      },responseError=>{
        this.toastrService.error("Could not added","Error")
      })
    }
    else{
      this.toastrService.error("Form is empty","Error")
    }
  }

}
