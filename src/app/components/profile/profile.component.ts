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
  public profit: number = 0;

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
              // if (currentCrypto['sell'] === trade['cryptoPrice']) {
                let diff = (currentCrypto['sell'] * trade.amount) - (trade['cryptoPrice'] * trade.amount);
                let percent = diff / currentCrypto['sell'] * 100.0;
                let profit = trade.amount * percent / 100;
                console.log(profit);
            });
        }
      });
  }
}
