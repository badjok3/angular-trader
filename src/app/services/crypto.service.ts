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
  postTrade(trade, amount, currentUser) {
        return this.http.put(baseUrl + '/user/' + appKey + '/' + localStorage.getItem('userId'), currentUser, {
          headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
          }
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
  postCryptoPost(post) {
    return this.http.post(baseUrl + '/appdata/' + appKey + '/posts', post, {
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
      }
    });
  }
  getCryptoPosts(id) {
    return this.http.get(baseUrl + '/appdata/' + appKey + `/posts?query={"cryptoId": "${id}"}`, {
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
      }
    });
  }
  deletePost(id) {
    return this.http.delete(baseUrl + '/appdata/' + appKey + '/posts/' + id, {
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
      }
    });
  }
  getComments(postId) {
    return this.http.get(baseUrl + '/appdata/' + appKey + `/comments?query={"postId": "${postId}"}`, {
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
      }
    });
  }
  postComment(comment) {
    return this.http.post(baseUrl + '/appdata/' + appKey + '/comments', comment, {
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
      }
    });
  }
  deleteComment(id) {
    return this.http.delete(baseUrl + '/appdata/' + appKey + '/comments/' + id, {
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
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
  getUserProfile(username) {
    return this.http.get(baseUrl + `/user/` + appKey + `/?query={"username":"${username}"}`, {
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
  getAllUsers() {
    return this.http.get(baseUrl + '/user/' + appKey, {
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
      }
    });
  }
  updateUser(user) {
      return this.http.put(baseUrl + '/user/' + appKey + '/' + localStorage.getItem('userId'), user, {
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
