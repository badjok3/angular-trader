export class PostModel {
  constructor(
    public cryptoId: string,
    public author: string,
    public content: string,
    public date: Date
  ) { }
}
