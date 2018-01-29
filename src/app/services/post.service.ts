import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_SkgAkd-Wz';
const appSecret = 'eeb099cc647c45a1984f5cc97d6b0ce6';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

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
}
