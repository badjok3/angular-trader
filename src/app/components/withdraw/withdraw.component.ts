import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  public availableBalance: number;
  public withdraw: number;
  public unsuccessfulWithdraw: boolean;
  constructor(
    private cryptoService: CryptoService,
    private router: Router,
    private toastr: ToastsManager) { }

  ngOnInit() {
    this.getBalance();
  }

  getBalance() {
    this.cryptoService.getUser()
      .subscribe(user => {
        this.availableBalance = user['available'];
      });
  }

  makeWithdraw() {
    if (this.withdraw > this.availableBalance) {
      this.unsuccessfulWithdraw = true;
      return;
    }

    this.cryptoService.makeWithdraw(this.withdraw);
    this.toastr.success(`Successfully withdrew ${this.withdraw}$`);
    this.router.navigate(['/home']);
  }
}
