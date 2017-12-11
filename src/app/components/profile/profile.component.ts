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
  public canEdit: boolean;
  constructor(private router: Router, private cryptoService: CryptoService) {
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const user = this.router.url.substr(this.router.url.lastIndexOf('/') + 1, this.router.url.length);
    this.cryptoService.getUserProfile(user)
      .subscribe(currentUser => {
        currentUser = currentUser[0]
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
}
