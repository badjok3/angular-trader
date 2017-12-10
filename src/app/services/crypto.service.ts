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
  postTrade(trade, amount) {
    this.getUser()
      .subscribe(currentUser => {
        currentUser['trades'].push(trade);
        currentUser['available'] = currentUser['available'] - amount;
        currentUser['allocated'] = +currentUser['allocated'] + amount;
        this.http.put(baseUrl + '/user/' + appKey + '/' + localStorage.getItem('userId'), currentUser, {
          headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
          }
        }).subscribe(data => {
          // TODO: notify trade success
          console.log(data);
        });
    });
  }
  makeDeposit(amount) {
    this.getUser()
      .subscribe(currentUser => {
        currentUser['available'] += amount;

        this.http.put(baseUrl + '/user/' + appKey + '/' + localStorage.getItem('userId'), currentUser, {
          headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
          }
        }).subscribe(data => {
          // TODO: notify deposit success
          console.log(data);
        });
      });
  }
  makeWithdraw(amount) {
    this.getUser()
      .subscribe(currentUser => {
        currentUser['available'] -= amount;

        this.http.put(baseUrl + '/user/' + appKey + '/' + localStorage.getItem('userId'), currentUser, {
          headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
          }
        }).subscribe(data => {
          // TODO: notify deposit success
          console.log(data);
        });
      });
  }
  getCryptoPosts(id) {
    return this.http.get(baseUrl + '/appdata/' + appKey + `/posts?={"cryptoId": "${id}"}`, {
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
      }
    });
  }
  getUser() {
    return this.http.get(baseUrl + '/user/' + appKey + '/' + localStorage.getItem('userId'), {
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
      }
    });
  }
  getCryptoById(id) {
    return this.http.get(baseUrl + '/appdata/' + appKey + '/cryptos/' + id, {
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
      }
    });
  }
}
