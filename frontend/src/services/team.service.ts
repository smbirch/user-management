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
    this.teamsUrl = 'http://localhost:8080/company/6/teams';
   }

   public findAll() {
    return this.http.get<Team[]>(this.teamsUrl);
   }
   
   public getTeamsByCompanyId(companyId: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.teamsUrl}/${companyId}/team`);
   }

   public saveTeam(companyId:number, TeamDto:any):Observable<Team[]> {
    console.log('teamdto',TeamDto);
    return this.http.post<Team[]>(`http://localhost:8080/company/${companyId}/teams`,TeamDto);
   }
   public getTestTeam(){
    return this.http.get<Team[]>('http://localhost:8080/company/6/teams');
    console.log('in test team');
   }

   getTeamByCompanyId(companyId: number, teamId:number): Observable<any>{
    return this.http.get<Team[]>(`http://localhost:8080/company/${companyId}/teams/${teamId}`);
   }
  
   //probably need to implement some error handling.
}
