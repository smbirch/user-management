import {Injectable} from '@angular/core';
import {User} from 'src/models/user';
import {Team} from 'src/models/team';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Announcement} from 'src/models/announcement';

class AnnouncementDto {
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private announcementsUrl = 'http://localhost:8080/company';

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Announcement[]> {
    const companiesString = localStorage.getItem('selectedCompany');
    if (!companiesString) {
      throw new Error('Companies data not found in local storage.');
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

  public saveAnnouncement(companyId: number, announcement: AnnouncementDto): Observable<Announcement> {
    const url = `${this.announcementsUrl}/${companyId}/announcements`;
    return this.http.post<Announcement>(url, announcement);
  }



}
