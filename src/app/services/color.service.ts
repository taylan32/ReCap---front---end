import { ResponseModel } from './../models/responseModel';
import { Color } from './../models/color';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44373/api/colors/"

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + "getAll"
    return this.httpClient.get<ListResponseModel<Color>>(newPath)
  }

  add(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newPath, color)
  }

  delete(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + "delete"
    return this.httpClient.post<ResponseModel>(newPath, color)
  }

}
