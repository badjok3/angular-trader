import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_SkgAkd-Wz';
const appSecret = 'eeb099cc647c45a1984f5cc97d6b0ce6';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

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
  makeDeposit(amount) {
    this.getUser()
      .subscribe(currentUser => {
        currentUser['available'] = currentUser['available'] + amount;

        this.http.put(baseUrl + '/user/' + appKey + '/' + localStorage.getItem('userId'), currentUser, {
          headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
          }
        });
      });
  }
  makeWithdraw(amount) {
    this.getUser()
      .subscribe(currentUser => {
        currentUser['available'] = currentUser['available'] - +amount;

        this.http.put(baseUrl + '/user/' + appKey + '/' + localStorage.getItem('userId'), currentUser, {
          headers: {
            'Authorization': 'Kinvey ' + localStorage.getItem('authtoken')
          }
        });
      });
  }
}
