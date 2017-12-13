import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from '../../services/authorization.service';
import { CryptoService } from '../../services/crypto.service';

import { Router } from '@angular/router';

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
  public editSuccess: boolean;

  constructor(
    private auth: AuthorizationService,
    private router: Router,
    private cryptoService: CryptoService
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.cryptoService.getUser()
      .subscribe(user => {
        this.model = user;
      });
  }

  updateUser() {
    this.cryptoService.updateUser(this.model)
      .subscribe(user => {
        this.editSuccess = true;
      });
  }
}
