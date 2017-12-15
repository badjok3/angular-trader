import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  public currentBalance: number;
  public deposit: number;
  constructor(
    private cryptoService: CryptoService,
    private router: Router,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.getBalance();
  }

  getBalance() {
    this.cryptoService.getUser()
      .subscribe(user => {
        this.currentBalance = user['available'];
      });
  }

  makeDeposit(amount) {
    this.cryptoService.getUser()
      .subscribe(user => {
        user['available'] = user['available'] + this.deposit;
        this.cryptoService.updateUser(user)
          .subscribe(data => {
            this.toastr.success(`Succesfully deposited ${amount}$`)
            this.router.navigate(['/home']);
          })
      })
  }
}
