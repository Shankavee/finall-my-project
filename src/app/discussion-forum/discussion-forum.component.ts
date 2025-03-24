import { Component, OnInit } from '@angular/core';
import { discussionService } from '../services/discussion.service';


@Component({
  selector: 'app-discussion-forum',
  standalone: false,
  templateUrl: './discussion-forum.component.html',
  styleUrls: ['./discussion-forum.component.css']
})
export class DiscussionForumComponent implements OnInit {
  posts: any[] = []; // Array to store posts

  constructor(private discussionService: discussionService) {} // Inject the API service

  ngOnInit(): void {
    this.fetchPosts(); // Fetch posts when the component initializes
  }

  fetchPosts(): void {
    this.discussionService.getPosts().subscribe(
      (data) => {
        this.posts = data; // Assign fetched data to the posts array
      },
      (error) => {
        console.error('Error fetching posts:', error); // Handle errors
      }
    );
  }
}