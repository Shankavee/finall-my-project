import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  newPassword: string = '';
  token: string = '';
  email: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
    });
  }

  resetPassword() {
    this.http.post('http://localhost:3000/api/reset-password', {
      token: this.token,
      email: this.email,
      newPassword: this.newPassword
    }).subscribe(
      (response: any) => alert(response.message),
      (error) => alert(error.error.message)
    );
  }
}
