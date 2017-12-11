import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CryptoService } from '../../services/crypto.service';
import { AuthorizationService } from '../../services/authorization.service';

import { CryptoModel } from '../../models/crypto';
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public cryptos: CryptoModel[];
  isAdmin: boolean;
  notification: any;
  subscription: Subscription;
  constructor(
    private cryptoService: CryptoService,
    private authService: AuthorizationService,
    private notificationsService: NotificationsService
  ) {
    this.subscription = this.notificationsService.getNotification()
      .subscribe(message => {
        this.notification = message;
      });
  }

  ngOnInit() {
    this.loadCryptos();
    this.isAdmin = this.authService.isAdmin();
    console.log(this.authService.isAdmin());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadCryptos(): void {
    this.cryptoService.getAllCryptos()
      .subscribe(data => {
        this.cryptos = data;
      });
  }
}
