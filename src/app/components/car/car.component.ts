import { CarDetailDto } from './../../models/carDetailDto';
import { CarService } from './../../services/car.service';
import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = []
  carsWithDetail:CarDetailDto[]=[]
  dataLoaded:boolean = false
  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCars()
    this.getAllCarsWithDetail()
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data
      this.dataLoaded=true
    })
  }
  getAllCarsWithDetail(){
    this.carService.getAllCarsWithDetail().subscribe(response=>{
      this.carsWithDetail=response.data
      this.dataLoaded=true
    })
  }


}
