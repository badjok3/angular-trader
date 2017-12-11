import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public model: RegisterModel = {
    username: '',
    password: '',
    email: '',
    trades: [],
    available: 0,
    allocated: 0,
    imageUrl: 'https://cdn2.f-cdn.com/ppic/85814928/logo/24833000/Cri6V/profile_logo_.png'
  };
  public registeredUser: string;
  public registerSuccess: boolean;
  public registerFail: boolean;

  constructor(private auth: AuthorizationService, private router: Router) {
  }

  userRegister() {
    this.auth.register(this.model)
      .subscribe(data => {
          this.successfulRegister(data);
        },
        err => {
          this.registerFail = true;
        });
  }

  get diagnostics(): string {
    return JSON.stringify(this.model);
  }

  successfulRegister(data): void {
    this.registerSuccess = true;
    this.registeredUser = data['username'];
  }
}
