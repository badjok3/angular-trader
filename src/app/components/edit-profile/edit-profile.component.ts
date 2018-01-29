import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from '../../services/authorization.service';

import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public model: any = {
    username: '',
    email: '',
    imageUrl: 'https://cdn2.f-cdn.com/ppic/85814928/logo/24833000/Cri6V/profile_logo_.png'
  };

  constructor(
    private auth: AuthorizationService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser()
      .subscribe(user => {
        this.model = user;
      });
  }

  updateUser() {
    this.userService.updateUser(this.model)
      .subscribe(user => {
        this.toastr.success(`Successfully updated ${user['username']}`)
        setTimeout(() => this.toastr.success('Please re-log to see your changes.'), 500);
      });
  }
}
