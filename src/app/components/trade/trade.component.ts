import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { Router } from '@angular/router';
import { CryptoModel } from '../../models/crypto';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  crypto: CryptoModel;
  public currentAmount: number;
  public insufficientFunds = true;
  public userBalance: number;
  constructor(private router: Router, private cryptoService: CryptoService) { }

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

  postTrade(): void {
    this.cryptoService.getUser()
      .subscribe(currentUser => {
        this.userBalance = currentUser['balance'];

        if (this.userBalance < this.currentAmount) {
          this.insufficientFunds = false;
          return;
        }
        const trade = {
          'cryptoId': this.crypto['_id'],
          'cryptoPrice': this.crypto.sell,
          'amount': this.currentAmount
        };

        this.cryptoService.postTrade(trade, this.currentAmount);
        // TODO: display success message
        this.router.navigate(['/details/' + this.crypto.name]);
      });
  }
}
