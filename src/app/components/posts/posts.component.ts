import { Component, OnInit, Input } from '@angular/core';

import { CryptoService } from '../../services/crypto.service';
import { AuthorizationService } from "../../services/authorization.service";

import { PostModel } from '../../models/post';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() cryptoId: string;
  posts;
  isAdmin;
  public model: PostModel = {
    cryptoId: '',
    author: localStorage.getItem('username'),
    content: '',
    date: new Date()
  };
  constructor(
    private cryptoService: CryptoService,
    private toastr: ToastsManager,
    private authService: AuthorizationService
  ) { }

  ngOnInit() {
    this.loadPosts();
    this.checkAdmin();
  }

  loadPosts() {
    this.cryptoService.getCryptoPosts(this.cryptoId)
      .subscribe(data => {
        this.posts = data;
      });
  }

  createPost() {
    this.model.cryptoId = this.cryptoId;
    this.cryptoService.postCryptoPost(this.model)
      .subscribe(data => {
        this.toastr.success('Post created')
        this.loadPosts();
      })
  }

  deletePost(id) {
    this.cryptoService.deletePost(id)
      .subscribe(data => {
        this.toastr.success('Post deleted');
        this.loadPosts();
      });
  }

  checkAdmin() {
    this.cryptoService.getUser()
      .subscribe(user => {
        this.isAdmin = this.authService.isAdmin(user);
      });
  }
}
