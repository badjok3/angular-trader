import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: object;
  public profit = 0;
  timer;
  public canEdit: boolean;
  constructor(
    private router: Router,
    private userService: UserService,
    private cryptoService: CryptoService,
    private toastr: ToastrService
  ) {
    this.timer = setInterval(_ => {
      this.loadAllTrades();
      console.log('hi');
    }, 5000);
   }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.profit = 0;
    const user = this.router.url.substr(this.router.url.lastIndexOf('/') + 1, this.router.url.length);
    this.userService.getUserProfile(user)
      .subscribe(currentUser => {
        currentUser = currentUser[0];
        this.user = currentUser;
        this.canEdit = (currentUser['username'] === localStorage.getItem('username'));
        this.loadAllTrades();
      });
  }

  closeTrade(currentTrade) {
    this.userService.getUser()
      .subscribe(currentUser => {
          currentUser['available'] += +(+currentTrade['amount'] + +currentTrade['profit']).toFixed(2);
          currentUser['allocated'] -= +currentTrade['amount'];
          for (const trade of currentUser['trades']) {
            if (trade['cryptoId'] === currentTrade['cryptoId'] && trade['amount'] === currentTrade['amount']) {
              currentUser['trades'].splice(currentUser['trades'].indexOf(trade), 1);
            }
          }
          this.userService.updateUser(currentUser)
            .subscribe(data => {
              this.toastr.success(`Closed ${currentTrade['cryptoName'].toUpperCase()} with ${currentTrade['profit']}$ profit`);
              this.loadUser();
            });
      });
  }

  loadTradeData(trade): void {
    if (trade['cryptoName'].toLowerCase() === 'new') {
      return;
    }
    this.cryptoService.getPrice(trade['cryptoName'])
      .subscribe(price => {
        trade['currentPrice'] = price[trade['cryptoName'].toUpperCase()]['USD'];
        trade['profit'] = ((trade['units'] * trade['cryptoPrice']) - (trade['units'] * trade['currentPrice'])).toFixed(2);
        if (isNaN(trade['profit'])) {
          return;
        }
        this.profit += +trade['profit'];
      });
  }

  loadAllTrades(): void {
    this.profit = 0;
    for (const trade of this.user['trades']) {
      this.loadTradeData(trade);
    }
  }
}
