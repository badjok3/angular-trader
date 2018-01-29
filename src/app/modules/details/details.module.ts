import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DetailsComponent } from '../../components/details/details.component';
import { PostsComponent } from '../../components/posts/posts.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { routing } from './details.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    DetailsComponent,
    PostsComponent,
    CommentComponent
  ]
})
export class DetailsModule {}
