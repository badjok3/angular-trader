export class CryptoModel {
  constructor(
    public id: string,
    public name: string,
    public portfolioName: string,
    public buy: number,
    public sell: number,
    public imageUrl: string
  ) { }
}
