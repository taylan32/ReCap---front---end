import { Router, RouterModule } from '@angular/router';
import { AppComponent } from './../../app.component';



import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  email:any
  isAuthenticatedForSingOutButton:boolean = this.appComponent.isAuthenticated
  constructor(
    private appComponent:AppComponent,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getEmail()
  }

  signOut(){

    if(this.appComponent.isAuthenticated){
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      this.appComponent.isAuthenticated = false
      this.appComponent.isAuthorized = false
      this.router.navigate(['/login'])
    }
  }
  
  getEmail(){
    this.email = localStorage.getItem("email")
  }



  
}
