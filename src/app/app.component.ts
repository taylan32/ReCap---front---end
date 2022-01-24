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
  constructor(private authService:AuthService){

  }

  ngOnInit(): void{
    this.isAuth()
  }

  isAuth(){
    if(this.authService.isAuthenticated()){
      this.isAuthenticated = true
    }
   
  }

}
