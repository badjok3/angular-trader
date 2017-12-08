import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  public currentBalance: number;
  public deposit: number;
  constructor(private cryptoService: CryptoService, private router: Router) { }

  ngOnInit() {
    this.getBalance();
  }

  getBalance() {
    this.cryptoService.getUser()
      .subscribe(user => {
        this.currentBalance = user['balance'];
      });
  }

  makeDeposit(amount) {
    this.cryptoService.makeDeposit(amount);
    this.router.navigate(['/home']);
  }
}
