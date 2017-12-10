import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: object;
  public profit = 0;

  constructor(private router: Router, private cryptoService: CryptoService) {
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.cryptoService.getUser()
      .subscribe(currentUser => {
        this.user = currentUser;
        for (const trade of currentUser['trades']) {
          this.cryptoService.getCryptoById(trade['cryptoId'])
            .subscribe(currentCrypto => {
                let diff = currentCrypto['sell'] - trade['cryptoPrice'];
                let percent = diff / currentCrypto['sell'] * 100;
                let profit = trade['amount'] / (percent * trade['amount'] / 100);
                trade['currentPrice'] = currentCrypto['sell'];
                trade['profit'] = profit;
                this.profit = this.profit + profit;
            });
        }
      });
  }
}
