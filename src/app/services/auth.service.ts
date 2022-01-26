import { Observable } from 'rxjs';
import { RegisterModel } from './../models/registerModel';
import { TokenModel } from './../models/tokenModel';
import { SingleResponseModel } from './../models/singleResponseModel';
import { LoginModel } from './../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl = "https://localhost:44373/api/auth/"

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel){

    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel)
  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false
    }
  }

}
