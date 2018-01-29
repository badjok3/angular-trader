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
  createCrypto(crypto) {
    return this.http.post(baseUrl + '/appdata/' + appKey + '/cryptos', crypto, {
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
