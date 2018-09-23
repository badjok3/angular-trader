import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoModel } from '../../models/crypto';

import { CryptoService } from '../../services/crypto.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  crypto: CryptoModel;
  currentAmount = 0;
  userBalance = 0;

  constructor(
    private router: Router,
    private cryptoService: CryptoService,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadDetails();
  }

  loadDetails(): void {
    const currentCrypto = this.router.url.substr(this.router.url.lastIndexOf('/') + 1, this.router.url.length);
    this.cryptoService.getCryptoDetails(currentCrypto)
      .subscribe(coin => {
        this.crypto = coin[0];
        this.userService.getUser()
          .subscribe(currentUser => {
            this.userBalance = currentUser['available'];
          });
      });
  }

  postTrade(): void {
    this.userService.getUser()
      .subscribe(currentUser => {
        this.userBalance = currentUser['available'];

        if (this.userBalance < this.currentAmount) {
          return;
        }
        const diff = (this.crypto['sell'] * this.currentAmount) - (this.crypto['buy'] * this.currentAmount);
        const percent = diff / this.crypto['sell'] * 100.0;
        const profit = this.currentAmount * (percent / 100.0);
        const trade = {
          'cryptoId': this.crypto['_id'],
          'cryptoImg': this.crypto.imageUrl,
          'cryptoName': this.crypto.name,
          'cryptoPrice': this.crypto.buy,
          'currentPrice': this.crypto.sell,
          'amount': this.currentAmount,
          'profit': profit,
        };
        currentUser['trades'].push(trade);
        currentUser['available'] = currentUser['available'] - this.currentAmount;
        currentUser['allocated'] = +currentUser['allocated'] + this.currentAmount;

        this.userService.updateUser(currentUser)
          .subscribe(data => {
            this.toastr.success(`Opened ${trade.cryptoName.toUpperCase()} at ${trade.currentPrice}`);
            this.router.navigate(['/details/' + this.crypto.name]);
          });
      });
  }
}
