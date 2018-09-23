import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

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
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getBalance();
  }

  getBalance() {
    this.userService.getUser()
      .subscribe(user => {
        this.availableBalance = user['available'];
      });
  }

  makeWithdraw() {
    if (this.withdraw > this.availableBalance) {
      this.unsuccessfulWithdraw = true;
      return;
    }

    this.userService.getUser()
      .subscribe(user => {
          user['available'] = user['available'] - this.withdraw;
          this.userService.updateUser(user)
            .subscribe(data => {
              this.toastr.success(`Successfully withdrew ${this.withdraw}$`);
              this.router.navigate(['/home']);
            });
      });
  }
}
