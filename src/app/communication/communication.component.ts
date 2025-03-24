import { Component, OnInit } from '@angular/core';
import { AnnouncementService, Announcement } from '../services/announcements.service';


@Component({
  selector: 'app-communication',
  standalone: false,
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {
  newAnnouncement: Announcement = { title: '', message: '' };
  announcements: Announcement[] = [];

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.announcementService.getAnnouncements().subscribe((data: Announcement[]) => {
      this.announcements = data;
    });
  }
  
  sendAnnouncement() {
    if (this.newAnnouncement.title && this.newAnnouncement.message) {
      this.announcementService.createAnnouncement(this.newAnnouncement).subscribe((response: Announcement) => {
        this.announcements.unshift(response);
        this.newAnnouncement = { title: '', message: '' };
      });
    }
  }
}
