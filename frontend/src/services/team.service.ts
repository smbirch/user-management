import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { Team } from 'src/models/team';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamsUrl: string;

  constructor(private http: HttpClient) {
    this.teamsUrl = 'http://localhost:8080/team';
   }

   public findAll() {
    return this.http.get<Team[]>(this.teamsUrl);
   }
   
   public getTeamsByCompanyId(companyId: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.teamsUrl}/${companyId}/team`);
   }

   public saveTeam(team: Team) {
    return this.http.post<Team>(this.teamsUrl,team);
   }
   //probably need to implement some error handling.
}
