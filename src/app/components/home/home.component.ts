import { Component, OnInit } from '@angular/core';

import { CryptoService } from '../../services/crypto.service';
import { CryptoModel } from '../../models/crypto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public cryptos: CryptoModel[];
  isAdmin: boolean;
  timer;
  constructor(
    private cryptoService: CryptoService,
  ) {
    this.timer = setInterval(_ => {
      this.loadAllPrices();
    }, 5000);
   }

  ngOnInit() {
    this.loadCryptos();
  }

  loadAllPrices(): void {
    for (const currentCoin of this.cryptos) {
      this.cryptoService.loadPrice(currentCoin);
    }
  }

  loadCryptos(): void {
     this.cryptoService.getAllCryptoData()
       .subscribe(data => {
         this.cryptos = data;
         this.loadAllPrices();
       });
  }
}
