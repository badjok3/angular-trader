import { Component } from '@angular/core';
import { LoginModel } from '../../models/login';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public model: LoginModel;
  public username: string;

  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.model = new LoginModel('', '');
    this.username = '';
  }

  login (): void {
    this.authService.login(this.model)
      .subscribe(
       data => {
          this.toastr.success('Login successful');
          this.successfulLogin(data);
        },
        err => {
          this.toastr.error('Login failed');
        }
      );
  }

  get diagnostics(): string {
    return JSON.stringify(this.model);
  }

  successfulLogin(data): void {
    this.authService.authtoken = data['_kmd']['authtoken'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    localStorage.setItem('userId', data['_id']);
    this.router.navigate(['/home']);
  }
}
