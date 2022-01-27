import { ToastrService } from 'ngx-toastr';

import { CarDetailDto } from './../../models/carDetailDto';
import { CarService } from './../../services/car.service';
import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = []
  carsWithDetail: CarDetailDto[] = []
  dataLoaded: boolean = false
  filterText:string=""
  constructor(private carService: CarService,
    private activatedRoot: ActivatedRoute,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoot.params.subscribe(params => {
      if (params["brandId"]) {
        this.getByBrandId(params["brandId"])
        this.getAllCarWithDetailsByBrandId(params["brandId"])
      }
      else {
        this.getCars()
        this.getAllCarsWithDetail()
      }
    })

  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true
    })
  }
  getAllCarsWithDetail() {
    this.carService.getAllCarsWithDetail().subscribe(response => {
      this.carsWithDetail = response.data
      this.dataLoaded = true
    },errorResponse=>{
      this.toastrService.error("Internal server error","Error")
    })
  }

  getByBrandId(brandId: number) {
    this.carService.getByBrandId(brandId).subscribe(response => {
      this.carsWithDetail = response.data
      this.dataLoaded = true
    })
  }

  getAllCarWithDetailsByBrandId(brandId:number){
    this.carService.getAllCarWithDetailsByBrandId(brandId).subscribe(response=>{
      this.carsWithDetail =response.data
      this.dataLoaded = true
    })
  }

}
