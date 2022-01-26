import { CarDetailDto } from './../../models/carDetailDto';
import { Car } from './../../models/car';
import { Color } from './../../models/color';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from './../../services/color.service';
import { BrandService } from './../../services/brand.service';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup
  car: Car
  brands: Brand[] = []
  colors: Color[] = []
  carDetails:CarDetailDto[] = []

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarInfo(params['carId'])
        this.getCurrentCarDetails(params['carId'])
      }
    })
    this.createUpdateForm()
    this.getBrands()
    this.getColors()
  }

  createUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelName:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  getCarInfo(carId: number) {
    this.carService.getCar(carId).subscribe(response => {
      this.car = response.data
    })

  }
  update(){
    if(this.carUpdateForm.valid){
      let carModel:Car = Object.assign({},this.carUpdateForm.value)
      carModel.id = this.car.id
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Updated")
        this.router.navigate(['/cars/cardetail/' + this.car.id])
        this.toastrService.info("You are being directed to the car detail page","Redirecting")
      },responseError=>{
        this.toastrService.error("Something is wrong","Could not updated")
      })
    }
  }
  getCurrentCarDetails(carId:number){
    this.carService.getCarDetail(carId).subscribe(response=>{
      this.carDetails = response.data
    })
  }

}
