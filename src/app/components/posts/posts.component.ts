import { Component, OnInit, Input } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { PostModel } from '../../models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() cryptoId: string;
  posts;
  public model: PostModel = {
    cryptoId: '',
    author: localStorage.getItem('username'),
    content: '',
    date: new Date()
  };
  constructor(private cryptoService: CryptoService) { }

  ngOnInit() {
    this.loadPosts();
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
        // TODO: display notification message
        this.loadPosts();
      })
  }

  deletePost(id) {
    this.cryptoService.deletePost(id)
      .subscribe(data => {
        // TODO: display notification message
        this.loadPosts();
      })
  }
}
