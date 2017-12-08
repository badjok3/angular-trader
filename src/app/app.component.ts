import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user = '';
  constructor(private auth: AuthorizationService) { }

  ngOnInit() {
    this.user = localStorage.getItem('username');
  }
}
