import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  public currentBalance: number;
  public deposit: number;
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.getBalance();
  }

  getBalance() {
    this.userService.getUser()
      .subscribe(user => {
        this.currentBalance = user['available'];
      });
  }

  makeDeposit(amount) {
    this.userService.getUser()
      .subscribe(user => {
        user['available'] = user['available'] + this.deposit;
        this.userService.updateUser(user)
          .subscribe(data => {
            this.toastr.success(`Succesfully deposited ${amount}$`)
            this.router.navigate(['/home']);
          });
      });
  }
}
