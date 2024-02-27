import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Company} from "../models/company";
import { Timestamp } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  private companyUrl ='http://localhost:8080/company';

  constructor(private http: HttpClient) { }


  getCompanies() {
    return this.http.get<Company[]>(`{this.companyUrl}/all`);
  }
}
