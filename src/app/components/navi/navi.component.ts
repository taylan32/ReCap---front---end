import { AppComponent } from './../../app.component';



import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private appComponent:AppComponent) { }

  ngOnInit(): void {
    
  }

  signOut(){

    if(this.appComponent.isAuthenticated){
      localStorage.removeItem("token")
      this.appComponent.isAuthenticated = false
    }
  }
  
}
