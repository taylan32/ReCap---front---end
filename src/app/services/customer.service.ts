import { SingleResponseModel } from './../models/singleResponseModel';
import { ResponseModel } from './../models/responseModel';
import { Customer } from './../models/customer';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44373/api/customers/"

  constructor(private httpClient:HttpClient) { }


  getCustomers():Observable<ListResponseModel<Customer>>{ 
    let newPath = this.apiUrl + "getAll"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath)
  }

  add(customer:Customer):Observable<SingleResponseModel<Customer>>{
    let newPath = this.apiUrl +"add"
    return this.httpClient.post<SingleResponseModel<Customer>>(newPath,customer)
  }

  getCustomerById(customerId:number):Observable<SingleResponseModel<Customer>>{
    let newPath = this.apiUrl + "getById?customerId=" + customerId
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath)
  }
  getCustomerDetailById(customerId:number):Observable<SingleResponseModel<Customer>>{
    let newPath = this.apiUrl + "getCustomerDetail?customerId=" + customerId
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath)
  }
  
  getAllCustomerDetail():Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl + "getAllCustomerDetail"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath)
  }

}
