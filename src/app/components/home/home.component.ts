import { Component, OnInit } from '@angular/core';

import { CryptoService } from '../../services/crypto.service';
import { AuthorizationService } from '../../services/authorization.service';
import { UserService } from '../../services/user.service';

import { CryptoModel } from '../../models/crypto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public cryptos: CryptoModel[];
  isAdmin: boolean;
  constructor(
    private cryptoService: CryptoService,
    private userService: UserService,
    private authService: AuthorizationService
  ) { }

  ngOnInit() {
    this.loadCryptos();
    this.adminCheck();
  }

  loadCryptos(): void {
    this.cryptoService.getAllCryptos()
      .subscribe(data => {
        this.cryptos = data;
      });
  }
  adminCheck(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.isAdmin = this.authService.isAdmin(user);
      });
  }
}
