import { Component, OnInit, Input } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { CommentModel } from '../../models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() postId;
  public model: CommentModel = {
    postId: '',
    content: '',
    author: localStorage.getItem('username'),
    date: new Date()
  };
  comments;
  constructor(private cryptoService: CryptoService) { }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.cryptoService.getComments(this.postId)
      .subscribe(data => {
        this.comments = data;
      });
  }

  postComment() {
    this.model.postId = this.postId;
    this.cryptoService.postComment(this.model)
      .subscribe(data => {
        // TODO: notify successful comment create
        this.loadComments();
      })
  }

  deleteComment(id) {
    this.cryptoService.deleteComment(id)
      .subscribe(data => {
        // TODO: notify successful comment delete
        this.loadComments();
      })
  }
}
