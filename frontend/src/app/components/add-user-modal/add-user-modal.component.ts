import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent {
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  makeAdmin: boolean = false;

  onCloseModal() {
    this.closeModal.emit();
  }
}
