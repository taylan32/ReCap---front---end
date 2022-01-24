import { CarImage } from './../models/carImage';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44373/api/carImages/"

  constructor(private httpClient:HttpClient) { }

  getAll(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "getAllByCarId?carId=" + carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }
}
