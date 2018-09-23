import { Component, OnInit, Input } from '@angular/core';
import { CommentModel } from '../../models/comment';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../services/authorization.service';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

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
    private userService: UserService,
    private postService: PostService,
    private toastr: ToastrService,
    private authService: AuthorizationService) { }

  ngOnInit() {
    this.loadComments();
    this.checkAdmin();
  }

  loadComments() {
    this.postService.getComments(this.postId)
      .subscribe(data => {
        this.comments = data;
      });
  }

  checkAdmin() {
    this.userService.getUser()
      .subscribe(user => {
        this.isAdmin = this.authService.isAdmin(user);
        this.authorImg = user['imageUrl'];
      });
  }

  postComment() {
    this.model.postId = this.postId;
    this.postService.postComment(this.model)
      .subscribe(data => {
        this.toastr.success('Comment posted');
        this.model.content = '';
        this.loadComments();
      });
  }

  deleteComment(id) {
    this.postService.deleteComment(id)
      .subscribe(data => {
        this.toastr.success('Comment deleted');
        this.loadComments();
      });
  }
}
