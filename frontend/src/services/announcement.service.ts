import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { Team } from 'src/models/team';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from 'src/models/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private announcementsUrl = 'http://localhost:8080/company';

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Announcement[]> {
    // Parse the companies object from local storage
    const companiesString = localStorage.getItem('selectedCompany');
    if (!companiesString) {
      throw new Error('Companies data not found in local storage.');
      // Handle the case where companies data is not found
    }
    const companies = JSON.parse(companiesString);

    const companyId = companies.id;

    if (!companyId) {
      throw new Error('Company ID not found in companies data.');
    //   TODO: redirect user to selection page and try again
    }

    const url = `${this.announcementsUrl}/${companyId}/announcements`;
    return this.http.get<Announcement[]>(url);
  }

  public saveAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(this.announcementsUrl, announcement);
  }
}
