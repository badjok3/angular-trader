import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DetailsComponent } from './components/details/details.component';
import { TradeComponent } from './components/trade/trade.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { ProfileComponent } from './components/profile/profile.component';

import { CryptoService } from './services/crypto.service';
import { AuthorizationService } from './services/authorization.service';

import { AuthGuard } from './guards/auth.guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [ AuthGuard ], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'details/:name', component: DetailsComponent },
  { path: 'trade/:name', component: TradeComponent },
  { path: 'deposit', component: DepositComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    DetailsComponent,
    TradeComponent,
    DepositComponent,
    ProfileComponent
  ],
  imports: [
    NgbModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CryptoService,
    AuthorizationService,
    AuthGuard
  ],
  exports: [ RouterModule ]
})
export class AppRoutesModule { }
