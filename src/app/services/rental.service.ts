import { SingleResponseModel } from './../models/singleResponseModel';
import { RentalModel } from './../models/rentalModel';
import { ResponseModel } from './../models/responseModel';
import { RentalDto } from './../models/rentalDto';
import { Rental } from './../models/rental';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl= "https://localhost:44373/api/rentals/"

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "getAll"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }

  add(rentalModel:RentalModel):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newPath,rentalModel)
  }

  getDetail(rentalId:number):Observable<ListResponseModel<RentalDto>>{
    let newPath = this.apiUrl + "getDetail?rentalId=" + rentalId
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath)
  }

  getByCarId(carId:number):Observable<ListResponseModel<RentalDto>>{
    let newPath = this.apiUrl + "getByCarId?carId=" + carId
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath)
  }

  getAllRentalsWithDetail():Observable<ListResponseModel<RentalDto>>{
    let newPath = this.apiUrl + "getDetails"
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath)
  }

  getDetailByCarId(carId:number):Observable<ListResponseModel<RentalDto>>{
    let newPath = this.apiUrl + "getRentalDetailsByCarId?carId=" + carId
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath)
  }
}
