import { Router, RouterModule } from '@angular/router';
import { AppComponent } from './../../app.component';



import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private appComponent:AppComponent,private router:Router) { }

  ngOnInit(): void {
    
  }

  signOut(){

    if(this.appComponent.isAuthenticated){
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      this.appComponent.isAuthenticated = false
      this.router.navigate(['/login'])
    }
  }
  
}
