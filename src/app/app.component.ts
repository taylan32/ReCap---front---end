import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recap';

  isAuthenticated : boolean = false
  isAuthorized:boolean = false
  constructor(private authService:AuthService){

  }

  ngOnInit(): void{
    this.isAuth()
    this.checkIfAuthorized()
  }

  isAuth(){
    if(this.authService.isAuthenticated()){
      this.isAuthenticated = true
    }
   
  }

  checkIfAuthorized(){
    let mail=localStorage.getItem("email")
    if(mail?.includes("@alparslanrent.com")){
      this.isAuthorized = true
    }
    else{
      this.isAuthorized = false
    }
  }

}
