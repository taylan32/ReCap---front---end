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

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private carImageService: CarImageService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId'])
        this.getImages(params['carId'])
      }
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



}
