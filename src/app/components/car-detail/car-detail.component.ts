import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RentalService } from './../../services/rental.service';
import { RentalModel } from './../../models/rentalModel';
import { UserModel } from './../../models/userModel';
import { UserService } from './../../services/user.service';
import { CustomerService } from './../../services/customer.service';
import { AppComponent } from './../../app.component';
import { CarImageService } from './../../services/car-image.service';
import { CarImage } from './../../models/carImage';
import { ToastrService } from 'ngx-toastr';
import { CarService } from './../../services/car.service';
import { CarDetailDto } from './../../models/carDetailDto';
import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carWithDetail: CarDetailDto[] = []
  carImages: CarImage[] = []
  isAuthorized:boolean = this.appComponent.isAuthorized
  user:UserModel
  customerId:number
  rentDateForm:FormGroup
  
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private carImageService: CarImageService,
    private router: Router,
    private appComponent:AppComponent,
    private customerService:CustomerService,
    private userService:UserService,
    private rentalService:RentalService,
    private formBuilder:FormBuilder
    ) { }

  ngOnInit(): void {
    this.createRentDateForm()
    this.getCustomerId()
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId'])
        this.getImages(params['carId'])
        
      }
    })
  }

  createRentDateForm(){
    this.rentDateForm = this.formBuilder.group({
      rentDate:[""],
      returnDate:["",Validators.required]
    })
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetail(carId).subscribe((response) => {
      this.carWithDetail = response.data
    })
  }

  getImages(carId: number) {
    this.carImageService.getAll(carId).subscribe((response) => {
      this.carImages = response.data
    })
  }

  delete() {
    let carToBeDeleted: Car = {
      id: this.carWithDetail[0].carId,
      brandId: this.carWithDetail[0].brandId,
      colorId: this.carWithDetail[0].colorId,
      modelName: this.carWithDetail[0].modelName,
      modelYear: this.carWithDetail[0].modelYear,
      dailyPrice: this.carWithDetail[0].dailyPrice,
      description: this.carWithDetail[0].description
    }
    this.carService.delete(carToBeDeleted).subscribe(response => {
      if (response.success) {
        this.toastrService.success(response.message, "Deleted")
        this.toastrService.info("You are being directed to home page", "Redirecting")
        this.router.navigate(['/'])
      }
      else {
        this.toastrService.error("Car cannot be deleted", "Could not deleted")
      }
    })

  }

  getCustomerId(){
    let mail = localStorage.getItem("email")?.toString()
    this.userService.getByEmail(mail).subscribe(response=>{
      this.user = response.data
      this.customerService.getByUserId(this.user.id).subscribe(response=>{
        this.customerId = response.data.id
      
      })
    })



 }


  rent(){
   
    let dateTime = new Date()
    let rentalModel:RentalModel

    if(!this.rentDateForm.value.rentDate){

       rentalModel= {
        carId:this.carWithDetail[0].carId,
        customerId : this.customerId,
        rentDate : dateTime,
        returnDate: this.rentDateForm.value.returnDate
      } 
    }
    else{
       rentalModel = {
        carId:this.carWithDetail[0].carId,
        customerId : this.customerId,
        rentDate : this.rentDateForm.value.rentDate,
        returnDate:this.rentDateForm.value.returnDate
      }
    }
    console.log(rentalModel.rentDate +" " + rentalModel.returnDate)
    this.rentalService.add(rentalModel).subscribe(repsonse=>{
      this.toastrService.success("Car has been rented","Rented")
      this.toastrService.info("You are being to the home page","Redirecting")
      this.router.navigate(['/cars'])
    },responseError=>{
      this.toastrService.error("The car you want to rent is not available now.","Error")
    })
  }

}
