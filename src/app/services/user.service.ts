import { UserModel } from './../models/userModel';
import { SingleResponseModel } from './../models/singleResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44373/api/users/"

  constructor(private httpClient:HttpClient) { }

  getByEmail(email:string):Observable<SingleResponseModel<UserModel>>{
    let newPath = this.apiUrl + "getByEmail?email=" + email
    return this.httpClient.get<SingleResponseModel<UserModel>>(newPath)
  }


}
