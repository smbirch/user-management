import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {NgIf} from "@angular/common";
import {UserServiceService} from "../../../services/user-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showModal: boolean = false;

  constructor(private userService: UserServiceService, private router: Router) {}


  toggleModal() {
    this.showModal = !this.showModal;
  }

  logout() {
    this.toggleModal();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
