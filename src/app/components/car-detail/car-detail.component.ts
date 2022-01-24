import { CarImageService } from './../../services/car-image.service';
import { CarImage } from './../../models/carImage';
import { ToastrService } from 'ngx-toastr';
import { CarService } from './../../services/car.service';
import { CarDetailDto } from './../../models/carDetailDto';
import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carWithDetail: CarDetailDto[] = []
  carToBeDeleted: CarDetailDto
  carImages:CarImage[] = []

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private carImageService:CarImageService) { }

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

  getImages(carId:number){
    this.carImageService.getAll(carId).subscribe((response)=>{
      this.carImages = response.data
      console.log(response.data)
    })
  }





}
