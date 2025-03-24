import { Component, OnInit, Input } from '@angular/core';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-discussion',
  standalone: false,
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  @Input() classId!: number;
  messages: any[] = [];
  message = '';

  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    this.classService.getDiscussions(this.classId).subscribe((data) => {
      this.messages = data;
    });

    this.classService.receiveMessages().subscribe((msg) => {
      this.messages.push(msg);
    });
  }

  sendMessage(): void {
    this.classService.sendMessage({ class_id: this.classId, user_id: 1, message: this.message });
    this.message = '';
  }
}
