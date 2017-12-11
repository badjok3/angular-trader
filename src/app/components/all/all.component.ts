import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  allUsers;
  constructor(private cryptoService: CryptoService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.cryptoService.getAllUsers()
      .subscribe(users => {
        this.allUsers = users;
      })
  }
}
