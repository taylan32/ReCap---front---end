import { Customer } from './../../models/customer';
import { CustomerService } from './../../services/customer.service';
import { ColorService } from './../../services/color.service';
import { BrandService } from './../../services/brand.service';
import { Color } from './../../models/color';
import { Brand } from './../../models/brand';
import { FormGroup } from '@angular/forms';
import { RentalDto } from './../../models/rentalDto';
import { RentalService } from './../../services/rental.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals: RentalDto[] = []
  rentalAddForm: FormGroup
  brands:Brand[] = []
  customer:Customer


  constructor(
    private rentalService: RentalService,
    private brandService:BrandService
  ) { }

  ngOnInit(): void {
    this.getRentals()
    this.getBrands()
  }

  getRentals() {
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }


 

}
