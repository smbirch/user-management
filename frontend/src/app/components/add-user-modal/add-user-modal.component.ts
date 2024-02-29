import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserServiceService} from "../../../services/user-service.service";
import {UserRequestDto} from "../../user-request-dto";

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent {
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  makeAdmin: boolean = false;
  username: string = "";
  password: string = "";
  firstName: string = "";
  lastName: string  = "";
  email: string = "";
  phone: string = "";

  constructor(private userService: UserServiceService) {}

  onCloseModal() {
    this.closeModal.emit();
  }

  onSubmit() {
    const newUserRequest: UserRequestDto = {
      credentials: {
        username: this.username,
        password: this.password
      },
      profile: {
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        phone: this.phone
      },
      isAdmin: this.makeAdmin
    };

    this.userService.save(newUserRequest).subscribe(
      (response: any) => {
        console.log('User saved:', response);
        this.closeModal.emit();
      },
      (error: any) => {
        console.error('Error saving user:', error);
      }
    );
  }
}
