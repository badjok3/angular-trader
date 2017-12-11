export class CommentModel {
  constructor(
    public postId: string,
    public content: string,
    public author: string,
    public date: Date
  ) { }
}
