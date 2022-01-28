import { RentalDto } from './../../models/rentalDto';
import { RentalService } from './../../services/rental.service';
import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals: RentalDto[] = []




  constructor(
    private rentalService: RentalService,
  ) { }

  ngOnInit(): void {
    this.getRentals()
  }

  getRentals() {
    this.rentalService.getAllRentalsWithDetail().subscribe(response => {
      this.rentals = response.data
    })
  }

  




}
