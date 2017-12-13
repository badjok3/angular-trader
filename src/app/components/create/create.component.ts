import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { CryptoService } from '../../services/crypto.service';

import { CryptoModel } from '../../models/crypto';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  model: CryptoModel = {
    name: '',
    portfolioName: '',
    buy: 0,
    sell: 0,
    imageUrl: ''
  };

  constructor(
    private cryptoService: CryptoService,
    private router: Router,
) { }

  createCrypto() {
    this.cryptoService.createCrypto(this.model)
      .subscribe(data => {
        console.log(data);
        // TODO: NOTIFY
        this.router.navigate(['/home']);
      });
  }
}
