import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_SkgAkd-Wz';
// const appSecret = 'eeb099cc647c45a1984f5cc97d6b0ce6';

@Injectable()
export class CryptoService {
  constructor(private http: HttpClient) {}

  getAllCryptoData(): Observable<any> {
    return this.http.get(baseUrl + '/appdata/' + appKey + '/cryptosNew', {
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
      }
    });
  }
  getAllCryptoPrices(): Observable<any> {
    return this.http.get(
      'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,IOTA,ETH,LTC,XRP,EOS,ETC&tsyms=USD,EUR'
    );
  }
  getDetails(crypto: string): Observable<any> {
    return this.http.get(baseUrl + '/appdata/' + appKey + `/cryptosNew?query={"name":"${crypto}"}`, {
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('authtoken')
      }
     });
  }
  getPrice(crypto: string): Observable<any> {
    return this.http.get(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${crypto.toUpperCase()}&tsyms=USD,EUR`
    );
  }
  loadPrice(coin) {
    this.getPrice(coin.name).subscribe(price => {
      const currentPrice = price[coin.name.toUpperCase()].USD;
      coin.buy = +(currentPrice + (currentPrice * +coin.spread)).toFixed(4);
      coin.sell = +(currentPrice - (currentPrice * +coin.spread)).toFixed(4);
      coin.imageUrl = `../../assets/coins/${coin.name}.jpg`;
    });
  }
}
