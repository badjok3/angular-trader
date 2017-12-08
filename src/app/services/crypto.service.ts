import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_SkgAkd-Wz';
const appSecret = 'eeb099cc647c45a1984f5cc97d6b0ce6';

@Injectable()
export class CryptoService {

  constructor(private http: HttpClient) { }

  getAllCryptos(): Observable<any> {
    return this.http.get(baseUrl + '/appdata/' + appKey + '/cryptos', {
        headers: {
          Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
        }
      });
  }
  getCryptoDetails(crypto) {
    return this.http.get(baseUrl + '/appdata/' + appKey + `/cryptos?query={"name":"${crypto}"}`, {
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
      }
    });
  }
  postTrade(trade) {
    let user;
    this.getUser()
      .subscribe(currentUser => {
      user = currentUser;
    });
    user.trades.push(trade);
    return this.http.put(baseUrl + '/user/' + appKey + '/' + localStorage.getItem('userId'), {
        'trades': user.trades
    });
  }
  getUser() {
    return this.http.get(baseUrl + '/user/' + appKey + '/' + localStorage.getItem('userId'));
  }
}
