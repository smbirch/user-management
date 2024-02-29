import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserServiceService } from '../../../services/user-service.service';
import { ProfileDto } from '../../profile-dto';
import { UserRequestDto } from '../../user-request-dto';
import { BasicUserDto } from '../../basic-user-dto';
import { FullUserDto } from '../../full-user-dto';
import { User } from '../../../models/user';
import { CredentialsDto } from '../../credentials-dto';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css'],
})
export class AddUserModalComponent {
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  makeAdmin: boolean = false;

  // Properties to store user input
  username: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  phone: string = '';

  constructor(private userService: UserServiceService) {}

  onCloseModal() {
    this.closeModal.emit();
  }

  onSubmit() {
    // Retrieve the current user's data from local storage
    const currentUserJson = localStorage.getItem('currentUser');
    if (!currentUserJson) {
      console.error('Current user data not found in local storage.');
      return;
    }

    // Parse the JSON string into a User object
    const currentUser: User = JSON.parse(currentUserJson);

    // Create credentials object
    const credentials: CredentialsDto = {
      username: this.username,
      password: this.password,
    };

    // Create profile object
    const profile: ProfileDto = {
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      phone: this.phone,
    };

    // Create user request object and populate basicUserDto with the current user's data

    const userRequest: UserRequestDto = {
      credentials: credentials,
      profile: profile,
      admin: this.makeAdmin,
      basicUserDto: {
        // @ts-ignore
        id: currentUser.id,
        profile: {
          // @ts-ignore
          firstname: currentUser.firstname,
          // @ts-ignore
          lastname: currentUser.lastname,
          // @ts-ignore
          email: currentUser.email,
          // @ts-ignore
          phone: currentUser.phone,
        },
        // @ts-ignore
        admin: currentUser.admin,
        // @ts-ignore
        active: currentUser.active,
        // @ts-ignore
        status: currentUser.status,
      },
    };

    // Call the UserService save method
    this.userService.save(userRequest).subscribe(
      (response: any) => {
        // Handle success
        console.log('User saved:', response);
        // Optionally, close the modal after saving
        this.closeModal.emit();
      },
      (error: any) => {
        // Handle error
        console.error('Error saving user:', error);
      }
    );
  }
}
