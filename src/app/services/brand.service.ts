import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';
import { Brand } from './../models/brand';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44373/api/brands/"

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"getAll")
  }

  getById(brandId:number):Observable<SingleResponseModel<Brand>>{
    let newPath = this.apiUrl + "getById?brandId=" + brandId
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath)
  }

  add(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl+ "add"
    return this.httpClient.post<ResponseModel>(newPath, brand)
  }

}
