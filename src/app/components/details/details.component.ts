import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CryptoModel } from '../../models/crypto';

import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  crypto: CryptoModel;
  notification: string;

  constructor(
    private router: Router,
    private cryptoService: CryptoService
  ) { }

  ngOnInit() {
    this.loadDetails();
  }

  loadDetails(): void {
    const currentCrypto = this.router.url.substr(this.router.url.lastIndexOf('/') + 1, this.router.url.length);
    
    this.cryptoService.getCryptoDetails(currentCrypto)
      .subscribe(coin => {
        this.crypto = coin[0];
      });
  }
}
