import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-create-announcement-modal',
  templateUrl: './create-announcement-modal.component.html',
  styleUrls: ['./create-announcement-modal.component.css']
})
export class CreateAnnouncementModalComponent {
  @Input() showModal: boolean = false;
  @Input() authorName: string = '';
  announcementText: string = '';


  closeModal() {
    this.showModal = false;
    this.announcementText = '';
  }

  openModal(): boolean {
    return this.showModal = false;
  }

  submitAnnouncement() {

    console.log('Submitted Announcement:', this.announcementText);
    this.closeModal();
  }
}
