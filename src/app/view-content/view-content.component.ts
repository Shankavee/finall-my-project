import { Component } from '@angular/core';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-view-content',
  standalone: false,
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.css'] // Fixed typo
})
export class ViewContentComponent {
  contentList: any[] = [];
  courseId!: number;

  constructor(private contentService: ContentService) {}

  fetchContent() {
    this.contentService.getUploadedContent(this.courseId).subscribe((data: any) => { // Fixed method name
      this.contentList = data;
    });
  }

  ngOnInit() {}
}
