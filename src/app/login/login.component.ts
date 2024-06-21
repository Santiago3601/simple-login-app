import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private recaptchaV3Service: ReCaptchaV3Service) {}

  verifyToken(token: string): void {
    const secretKey = '6LeNlOYpAAAAAGAb27UdyDYNr9D3cQtU4xBjP58-';
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    fetch(verifyUrl, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Verification successful:', data);
      } else {
        console.log('Verification failed:', data);
      }
    })
    .catch(error => {
      console.error('Error verifying reCAPTCHA:', error);
    });
  }
  onSubmit() {
    if (this.username && this.password) {
      this.recaptchaV3Service.execute('login').subscribe((token: string) => {
        console.log('Recaptcha token:', token);
        this.verifyToken(token);
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
