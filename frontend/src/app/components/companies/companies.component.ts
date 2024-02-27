import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {

  constructor(private router: Router){}

  goHome(){
    this.router.navigateByUrl('/home');
  }
}
