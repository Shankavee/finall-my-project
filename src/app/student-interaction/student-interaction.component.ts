import { Component, OnInit } from '@angular/core';
import { StudentInteractionService } from '../services/student-interaction.service';
import { Forum } from '../models/forum.model';
import { Announcement } from '../models/announcement.model';

@Component({
  selector: 'app-student-interaction',
  standalone: false,
  templateUrl: './student-interaction.component.html',
  styleUrls: ['./student-interaction.component.css'],
})
export class StudentInteractionComponent implements OnInit {
  forums: Forum[] = [];
  announcements: Announcement[] = [];
  newPost: Partial<Forum> = { title: '', content: '', authorId: 1 };
  newAnnouncement: Partial<Announcement> = { title: '', content: '', authorId: 1 };

  constructor(private interactionService: StudentInteractionService) {}

  ngOnInit() {
    this.fetchForums();
    this.fetchAnnouncements();
  }

  fetchForums() {
    this.interactionService.getForums().subscribe((data: Forum[]) => {
      this.forums = data;
    });
  }

  fetchAnnouncements() {
    this.interactionService.getAnnouncements().subscribe((data: Announcement[]) => {
      this.announcements = data;
    });
  }

  createPost() {
    this.interactionService.createForumPost(this.newPost).subscribe(() => {
      this.fetchForums();
      this.newPost = { title: '', content: '', authorId: 1 };
    });
  }

  createAnnouncement() {
    this.interactionService.createAnnouncement(this.newAnnouncement).subscribe(() => {
      this.fetchAnnouncements();
      this.newAnnouncement = { title: '', content: '', authorId: 1 };
    });
  }
}
