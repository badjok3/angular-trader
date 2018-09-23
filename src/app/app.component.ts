import { Component, ViewContainerRef } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AuthorizationService,
              // public toastr: ToastrService,
              vcr: ViewContainerRef) {

    // this.toastr.setRootViewContainerRef(vcr);
  }

  getCurrentUser() {
    return localStorage.getItem('username');
  }
}
