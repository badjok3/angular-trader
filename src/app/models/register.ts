export class RegisterModel {
  constructor (
    public username: string,
    public password: string,
    public email: string,
    public trades: Array<object>,
    public available: number,
    public allocated: number,
    public imageUrl: string
  ) { }
}
