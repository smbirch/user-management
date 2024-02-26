import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from 'src/models/project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl: string;
  constructor(private http: HttpClient) {
    this.projectsUrl = 'http://localhost:8080/projects';
   }

   public findAll(): Observable<Project[]> {
    return this.http.get<Project []>(this.projectsUrl);
   }

   public save(project: Project) {
    return this.http.put<Project>(this.projectsUrl,project);
   }
}
