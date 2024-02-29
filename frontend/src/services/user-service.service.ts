import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FullUserDto} from "../app/full-user-dto";
class UserRequestDto {
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
   }


   public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
   }

   public save(user: UserRequestDto) {
     console.log(user)
    return this.http.post<User>(this.usersUrl, user);
   }

    public login(credentials: CredentialsDto): Observable<User> {
        return this.http.post<User>(`${this.usersUrl}/login`, credentials);
    }


public findCompanyActiveUsers(): Observable<User[]>
{

  return this.http.get<User[]>('http://localhost:8080/company/6/active-users');
}
   //probably need to implement some error handling.
}
export class CredentialsDto {
    username: string | undefined;
    password: string | undefined;
}
