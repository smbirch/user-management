import {Component, OnInit} from '@angular/core';
import {CredentialsDto, UserServiceService} from "../../../services/user-service.service";
import {Router} from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    credentials: CredentialsDto = {username: '', password: ''};

    constructor(private userService: UserServiceService, private router: Router) {
    }

    login() {
        this.userService.login(this.credentials).subscribe(
            (user) => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('isLoggedIn', 'true');
                console.log(user.admin)
                if (user.admin === true) {
                    this.router.navigate(['/companies']);
                } else {
                    this.router.navigate(['/home']);
                }

            },
            (error) => {
                console.error('Login failed: ', error);
            }
        );
    }

    goToCompanies() {
        this.router.navigateByUrl('/companies');
    }
}
