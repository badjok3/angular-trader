import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CryptoService } from '../../services/crypto.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: object;
  public profit = 0;
  public canEdit: boolean;
  constructor(
    private router: Router,
    private cryptoService: CryptoService,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.profit = 0;
    const user = this.router.url.substr(this.router.url.lastIndexOf('/') + 1, this.router.url.length);
    this.cryptoService.getUserProfile(user)
      .subscribe(currentUser => {
        currentUser = currentUser[0];
        this.user = currentUser;
        this.canEdit = (currentUser['username'] === localStorage.getItem('username'));
        for (const trade of currentUser['trades']) {
          this.cryptoService.getCryptoById(trade['cryptoId'])
            .subscribe(currentCrypto => {
                let diff = currentCrypto['sell'] - trade['cryptoPrice'];
                let percent = diff / currentCrypto['sell'] * 100;
                let profit = trade['amount'] * percent / 100;
                trade['currentPrice'] = currentCrypto['sell'];
                trade['profit'] = profit.toFixed(2);
                this.profit = +(this.profit + profit).toFixed(2);
            });
        }
      });
  }

  closeTrade(currentTrade) {
    this.cryptoService.getUser()
      .subscribe(currentUser => {
          currentUser['available'] += +(+currentTrade['amount'] + +currentTrade['profit']).toFixed(2);
          currentUser['allocated'] -= +currentTrade['amount'];
          for (const trade of currentUser['trades']) {
            if (trade['cryptoId'] === currentTrade['cryptoId'] && trade['amount'] === currentTrade['amount']) {
              currentUser['trades'].splice(currentUser['trades'].indexOf(trade), 1);
            }
          }
          this.cryptoService.updateUser(currentUser)
            .subscribe(data => {
              this.toastr.success(`Closed ${currentTrade['cryptoName'].toUpperCase()} with ${currentTrade['profit']}$ profit`);
              this.loadUser();
            });
      });
  }
}
