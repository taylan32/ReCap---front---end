import { ToastrService } from 'ngx-toastr';
import { ColorService } from './../../services/color.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createColorAddForm()
  }
  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  addColor() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response=>{
        this.toastrService.success(response.message,"Added")
        this.toastrService.info("You are being directed to home page","Redirecting")
        this.router.navigate(['/'])
      },responseError=>{
        this.toastrService.error("Color could not added","Error")
      })
    }
    else {
      this.toastrService.error("Form is empty","Error")
    }
  }

}
