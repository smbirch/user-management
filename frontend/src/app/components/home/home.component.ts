import {Component, OnInit} from '@angular/core';
import {Announcement} from "../../../models/announcement";
import {AnnouncementService} from "../../../services/announcement.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  announcements: Announcement[] = [];
  showModal: boolean = false;
  authorName: string = '';
  announcementText: string = '';

  constructor(private announcementService: AnnouncementService) {
  }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.announcementService.findAll().subscribe(
      (data: Announcement[]) => {
        this.announcements = data;
      },
      (error) => {
        console.error('Error fetching announcements:', error);
      }
    );
  }

  isAdmin(): boolean {
    // Retrieve user data from local storage
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      // Check if the user is an admin
      return user.admin === true;
    }
    return false;
  }

  openModal(): void {
    // Get author's name from local storage
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      console.log(userJson)
      const user = JSON.parse(userJson);
      this.authorName = `${user.firstName} ${user.lastName}`;
    }
    this.showModal = true;
  }

// closeModal()
// {
//   this.showModal = false;
//   this.authorName = '';
//   this.announcementText = '';
// }

  submitAnnouncement() {

    console.log('Submitted Announcement:', this.announcementText);
    // this.closeModal();
  }
}
