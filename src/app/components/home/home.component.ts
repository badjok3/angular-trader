import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { CryptoModel } from '../../models/crypto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cryptos: CryptoModel[];

  constructor(private cryptoRequester: CryptoService) { }

  ngOnInit() {
    this.loadCryptos();
  }
  loadCryptos(): void {
    this.cryptoRequester.getAllCryptos()
      .subscribe(data => {
        this.cryptos = data;
      });
  }
}
