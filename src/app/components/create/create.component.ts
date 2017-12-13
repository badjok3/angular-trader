import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
    private toastr: ToastsManager
) { }

  createCrypto() {
    this.cryptoService.createCrypto(this.model)
      .subscribe(data => {
        this.toastr.success(`Added ${this.model.name.toUpperCase()}`);
        this.router.navigate(['/home']);
      });
  }
}
