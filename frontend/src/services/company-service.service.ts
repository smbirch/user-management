import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User
 } from 'src/models/user';
@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  private companyUrl ='http://localhost:8080/company';

  constructor(private http: HttpClient) { }

  public getCompanyUserById(id: number){
    return this.http.get<User>(`{this.companyUrl}/{id}/users`);
  }

  
}
