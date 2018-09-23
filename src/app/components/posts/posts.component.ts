import { Component, OnInit, Input } from '@angular/core';

import { CryptoService } from '../../services/crypto.service';
import { AuthorizationService } from '../../services/authorization.service';

import { PostModel } from '../../models/post';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

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
    private userService: UserService,
    private postService: PostService,
    private toastr: ToastrService,
    private authService: AuthorizationService
  ) { }

  ngOnInit() {
    this.loadPosts();
    this.checkAdmin();
  }

  loadPosts() {
    this.postService.getCryptoPosts(this.cryptoId)
      .subscribe(data => {
        this.posts = data;
      });
  }

  createPost() {
    this.model.cryptoId = this.cryptoId;
    this.postService.postCryptoPost(this.model)
      .subscribe(data => {
        this.toastr.success('Post created');
        this.loadPosts();
        this.model.content = '';
      });
  }

  deletePost(id) {
    this.postService.deletePost(id)
      .subscribe(data => {
        this.toastr.success('Post deleted');
        this.loadPosts();
      });
  }

  checkAdmin() {
    this.userService.getUser()
      .subscribe(user => {
        this.isAdmin = this.authService.isAdmin(user);
      });
  }
}
