import { ToastrService } from 'ngx-toastr';
import { RentalDto } from './../../models/rentalDto';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from './../../services/rental.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prev-rent-info',
  templateUrl: './prev-rent-info.component.html',
  styleUrls: ['./prev-rent-info.component.css']
})
export class PrevRentInfoComponent implements OnInit {

  previousRentals:RentalDto[] = []
  constructor(
    private rentalService:RentalService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService
  ) { }


  ngOnInit(): void {
   this.activatedRoute.params.subscribe((params)=>{
     if(params['carId']){
       this.getDetail(params['carId'])
     }
   })

  }

  getDetail(carId:number){
    this.rentalService.getDetailByCarId(carId).subscribe(response=>{
      this.previousRentals = response.data
      console.log(carId)
      if(response.data.length !== 0 ){
        this.toastrService.success(response.message,"Listed")
      }
      else{
        this.toastrService.info("The car has not been rented yet.")
      }
    })
  }

}
