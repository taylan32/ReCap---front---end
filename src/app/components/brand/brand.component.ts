import { CarDetailDto } from './../../models/carDetailDto';
import { CarService } from './../../services/car.service';
import { Brand } from './../../models/brand';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands: Brand[] = []
  dataLoaded: boolean = false
  currentBrand: Brand = { id: 0, name: '' }
  cars: CarDetailDto[] = []
  carAmount: number = 0

  constructor(private brandService: BrandService, private carService: CarService) { }

  ngOnInit(): void {
    this.getBrands()
    this.getAllCarNumber()
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
      this.dataLoaded = true
    })
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand
  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return "list-group-item active"
    }
    else {
      return "list-group-item"
    }
  }

  getAllBrandClass() {
    if (this.currentBrand.id == 0) {
      return "list-group-item active"
    }
    else {
      return "list-group-item"
    }
  }

  getAllCarNumber(){
    this.carService.getAllCarsWithDetail().subscribe(response=>{
      this.cars=response.data
      this.carAmount = this.cars.length
    })
  }
  getCarNumberByBrandId(brandId: number) {
    this.carService.getAllCarWithDetailsByBrandId(this.currentBrand.id).subscribe(response => {
      this.cars = response.data
      this.carAmount = this.cars.length
    })
  }

}
