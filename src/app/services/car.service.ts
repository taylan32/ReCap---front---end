import { SingleResponseModel } from './../models/singleResponseModel';
import { ResponseModel } from './../models/responseModel';
import { CarDetailDto } from './../models/carDetailDto';
import { ListResponseModel } from './../models/listResponseModel';
import { Car } from './../models/car'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44373/api/cars/"

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "getAll"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCar(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + "getByCarId?carId=" + carId
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)
  }

  getAllCarsWithDetail(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "getAllWithDetails"
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }

  getByBrandId(brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "getByBrandId?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }
  getAllCarWithDetailsByBrandId(brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "getAllCarWithDetailsByBrandId?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }

  addCar(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newPath, car)
  }
  getCarDetail(carId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "getCarDetails?carId=" + carId
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }

  delete(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + "delete"
    return this.httpClient.post<ResponseModel>(newPath, car)
  }
  update(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(newPath, car)
  }
}
