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

  private announcementsUrl: string;

  constructor(private http: HttpClient) {
    this.announcementsUrl = 'our url';
   }

   public findAll(){
    return this.http.get<Announcement[]>(this.announcementsUrl);
   }

   public saveAnnouncement(announcement:Announcement) {
    return this.http.post<Announcement>(this.announcementsUrl,announcement);
   }
}
