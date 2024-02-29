import {Component, OnInit} from '@angular/core';
import {FullUserDto} from "../../full-user-dto";
import {CompanyServiceService} from "../../../services/company-service.service";

@Component({
  selector: 'app-users-registry',
  templateUrl: './users-registry.component.html',
  styleUrls: ['./users-registry.component.css']
})
export class UsersRegistryComponent implements OnInit {
  users: FullUserDto[] = [];
  showModal: boolean = false;

  constructor(private companyService: CompanyServiceService) { }

  ngOnInit(): void {
    const selectedCompanyString = localStorage.getItem('selectedCompany');
    if (!selectedCompanyString) {
      throw new Error('company data not found in local storage');
    }
    const selectedCompany = JSON.parse(selectedCompanyString);
    const companyId: number = selectedCompany.id;
    this.companyService.getAllTotalUsers(companyId).subscribe(
      (data: FullUserDto[]) => {
        this.users = data;
        console.log(data)
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  getUserTeam(user: any): string {
    if (user && user.teams) {
      return user.teams.map((team: { name: any; }) => team.name).join(', ');
    }
    return '';
  }

  openAddUserModal() {
    this.showModal = true;
  }

  closeAddUserModal() {
    // Toggle the showModal property to false to hide the modal
    this.showModal = false;
  }
}
