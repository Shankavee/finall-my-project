import { Component } from '@angular/core';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-upload-content',
  standalone: false,
  
  templateUrl: './upload-content.component.html',
  styleUrl: './upload-content.component.css'
})
export class UploadContentComponent {
  courseId!: number;
  title!: string;
  fileType!: string;
  selectedFile!: File;
  uploadMessage = '';
  uploadedFiles: any[] = [];

  constructor(private contentService: ContentService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.courseId || !this.title || !this.fileType || !this.selectedFile) {
      this.uploadMessage = "All fields are required!";
      return;
    }

    const formData = new FormData();
    formData.append("course_id", this.courseId.toString());
    formData.append("title", this.title);
    formData.append("file_type", this.fileType);
    formData.append("file", this.selectedFile);

    this.contentService.uploadContent(formData).subscribe((response: any) => {
      this.uploadMessage = response?.message || "Upload successful!";
      this.loadUploadedContent();
    });
  }

  loadUploadedContent() {
    this.contentService.getUploadedContent(this.courseId).subscribe((data: any) => {
      this.uploadedFiles = data as any[];
    });
  }

  deleteContent(id: number) {
    this.contentService.deleteContent(id).subscribe(() => {
      this.loadUploadedContent();
    });
  }
}