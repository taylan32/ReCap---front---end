import { Router, RouterModule } from '@angular/router';
import { ColorService } from './../../services/color.service';
import { Color } from './../../models/color';
import { CarService } from './../../services/car.service';
import { BrandService } from './../../services/brand.service';
import { Brand } from './../../models/brand';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm: FormGroup
  brands: Brand[] = []
  colors: Color[] = []


  constructor(private formBuilder: FormBuilder,
    private brandService: BrandService,
    private carService: CarService,
    private colorService: ColorService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createCarAddForm()
    this.getBrandList()
    this.getColorList()
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelName: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required]
    })
  }

  getBrandList() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  getColorList() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  addCar(){
    if(this.carAddForm.valid){
      let carModel= Object.assign({},this.carAddForm.value)
      carModel.brandId=parseInt(carModel.brandId)
      carModel.colorId=parseInt(carModel.colorId)
      this.carService.addCar(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Car added.")
        this.router.navigate(['/cars'])
        this.toastrService.info("You are being directed to cars page")
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for(let i=0; i<responseError.error.ValidationErrors.lenght;i++){
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation error")
          }
        }
      })
    }
    else{
      this.toastrService.warning("All fied must be entered.")
    }
  }

}
