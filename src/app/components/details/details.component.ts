import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CryptoModel } from '../../models/crypto';

import { CryptoService } from '../../services/crypto.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  crypto: CryptoModel;
  subscription: Subscription;
  notification: string;

  constructor(
    private router: Router,
    private cryptoService: CryptoService,
    private notificationsService: NotificationsService
  ) {
    this.subscription = this.notificationsService.getNotification()
      .subscribe(notification => {
        this.notification = notification;
      });
  }

  ngOnInit() {
    this.loadDetails();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadDetails(): void {
    const currentCrypto = this.router.url.substr(this.router.url.lastIndexOf('/') + 1, this.router.url.length);
    this.cryptoService.getCryptoDetails(currentCrypto)
      .subscribe(coin => {
        this.crypto = coin[0];
      });
  }

  hideNotification(): void {
    this.notificationsService.clearNotification();
  }
}
