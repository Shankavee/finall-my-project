import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private http: HttpClient) {}

  sendResetLink() {
    this.http.post('http://localhost:3000/api/forgot-password', { email: this.email })
      .subscribe(
        (response: any) => alert(response.message),
        (error) => alert(error.error.message)
      );
  }
}
