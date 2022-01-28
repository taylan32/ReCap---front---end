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

  getRentals():Observable<ListResponseModel<RentalDto>>{
    let newPath = this.apiUrl + "getAll"
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath)
  }

  add(rentalModel:RentalModel):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newPath,rentalModel)
  }
}
