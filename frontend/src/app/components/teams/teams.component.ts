import { Component } from '@angular/core';
import { Team } from 'src/models/team';
import { User } from 'src/models/user';

import { Project} from 'src/models/project';
import { OnInit } from '@angular/core';

import { TeamService } from 'src/services/team.service';
import { ModalsService } from 'src/services/modal.service';
import { UserServiceService } from 'src/services/user-service.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit{

  company_id: number = 0;

  teams?: Team[];
  users?: User[];

  newTeamName?: string;
  newTeamDescription?: string;
  usersToAddToTeam?: User[];
  selectedUserIds?: number[];
  selectedUsers?: User[];

 
  constructor(private teamService: TeamService, protected modalService: ModalsService, private userService: UserServiceService){}
  ngOnInit(){
    this.testService();
    this.getUsers();
  }
  

  getTeams(){
   this.teamService.getTeamsByCompanyId(this.company_id).subscribe({
    next: (data) => this.teams = data,
    error: (error) => console.error('There was a problem getting company teams', error.message)
   });
   console.log(this.teams);
  }


  //this is just a test method
  testService(){
    this.teamService.getTestTeam().subscribe({
      next: (data) => {
        
        this.teams = this.conformToTeam(data);
        console.log(this.teams);
      },
      error: (error) => {
        console.error('There was a problem getting company teams', error);
      }
     });
  }

  //Building team from all users
  //will need to change to only the users with the company id in local storage
  getUsers(){
    this.userService.findCompanyActiveUsers().subscribe({
      next: (data) => {

        this.users = this.conformToUsers(data);
        console.log('here are the users',this.users);
      },
      error: (error) => {
        console.error("there was a problem getting the users", error);
      }
    });
  }
  
  private conformToTeam(data: any[]): Team[] {
    return data.map(team => {
        const conformedTeam = new Team();
        conformedTeam.id = team.id;
        conformedTeam.name = team.name;
        conformedTeam.description = team.description;
        conformedTeam.teammates = team.teammates.map((teammate: any) => {
            const user = new User();

            user.id = teammate.id;
            user.firstName = teammate.profile.firstName; 
            user.lastName = teammate.profile.lastName; 
            user.email = teammate.profile.email;
            user.phone = teammate.profile.phone;
            user.active = teammate.active;
            user.admin = teammate.admin;
            user.status = teammate.status;
            return user;
        });
        return conformedTeam;
    });
}
private conformToUsers(data: any[]): User[]{
  return data.map(user => {
    const conformedUser = new User();

    conformedUser.id = user.id;
    conformedUser.firstName = user.profile.firstName;
    conformedUser.lastName = user.profile.lastName;
    conformedUser.email = user.profile.email;
    conformedUser.phone = user.profile.phone;
    conformedUser.active = user.active;
    conformedUser.admin = user.admin;
    conformedUser.status = user.status;

    return conformedUser;
  });
 
}

createTeam(){
  console.log(this.newTeamName);
  console.log(this.newTeamDescription);
  const TeamDto = {id: 6, name: this.newTeamName, description: this.newTeamDescription,
    teammates: this.selectedUsers?.map(user => ({
      id: user.id,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      },
      admin: user.admin,
      active: user.active,
      status: user.status

    }))
  };

  //this is just for testing. once i get access to things in local storage this will not be hardcoded
  const BasicUserDto ={
    id: 23,
    profile: {
      firstName: 'Logan',
      lastName: 'Roy',
      email: 'lroy@email.com',
      phone: '(555) 555-5555'
    },
    admin: true,
    active: true

  }
  const CompleteDto = {teamDto: TeamDto, basicUserDto: BasicUserDto}
  this.teamService.saveTeam(TeamDto,BasicUserDto);
}
  
  openModal(){
    this.modalService.open('modal-add-team');
  }

  closeModal(){

    this.modalService.close();
  }

  clearSelection(){
    this.selectedUsers = [];
  }

  
}
