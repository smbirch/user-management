import {Component, OnInit} from '@angular/core';
import {CredentialsDto, UserServiceService} from "../../services/user-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials: CredentialsDto = {username: '', password: ''};

  constructor(private userService: UserServiceService) {
  }



  login() {
    this.userService.login(this.credentials).subscribe(
      (user) => {
        console.log('Login successful', user);
        // route to next page
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
