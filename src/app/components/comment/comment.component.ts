import { Component, OnInit, Input } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { CommentModel } from '../../models/comment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthorizationService } from '../../services/authorization.service';

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
  isAdmin;
  authorImg;
  constructor(
    private cryptoService: CryptoService,
    private toastr: ToastsManager,
    private authService: AuthorizationService) { }

  ngOnInit() {
    this.loadComments();
    this.checkAdmin();
  }

  loadComments() {
    this.cryptoService.getComments(this.postId)
      .subscribe(data => {
        this.comments = data;
      });
  }

  checkAdmin() {
    this.cryptoService.getUser()
      .subscribe(user => {
        this.isAdmin = this.authService.isAdmin(user);
        this.authorImg = user['imageUrl'];
      });
  }

  postComment() {
    this.model.postId = this.postId;
    this.cryptoService.postComment(this.model)
      .subscribe(data => {
        this.toastr.success('Comment posted');
        this.model.content = '';
        this.loadComments();
      });
  }

  deleteComment(id) {
    this.cryptoService.deleteComment(id)
      .subscribe(data => {
        this.toastr.success('Comment deleted');
        this.loadComments();
      });
  }
}
