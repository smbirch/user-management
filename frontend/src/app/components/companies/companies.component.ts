import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CompanyServiceService} from "../../../services/company-service.service";
import {Company} from "../../../models/company";


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: any[] = [];

  constructor(private router: Router, private companyService: CompanyServiceService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.getCompanies().subscribe(
      (data: Company[]) => {
        this.companies = data;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  goHome(){
    this.router.navigateByUrl('/home');
  }
}
