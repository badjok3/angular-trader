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
  public crypto: CryptoModel;
  public currentAmount: number;
  public insufficientFunds = false;
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
        this.userBalance = currentUser['available'];

        if (this.userBalance < this.currentAmount) {
          this.insufficientFunds = true;
          return;
        } else {
          this.insufficientFunds = false;
        }

        let diff = (this.crypto['sell'] * this.currentAmount) - (this.crypto['buy'] * this.currentAmount);
        let percent = diff / this.crypto['sell'] * 100.0;
        let profit = this.currentAmount * (percent / 100.0);
        const trade = {
          'cryptoId': this.crypto['_id'],
          'cryptoImg': this.crypto.imageUrl,
          'cryptoName': this.crypto.name,
          'cryptoPrice': this.crypto.buy,
          'currentPrice': this.crypto.sell,
          'amount': this.currentAmount,
          'profit': profit,
        };

        this.cryptoService.postTrade(trade, this.currentAmount);
        // TODO: display success message
        this.router.navigate(['/details/' + this.crypto.name]);
      });
  }
}
