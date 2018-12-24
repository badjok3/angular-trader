export class CryptoModel {
  constructor(
    public name: string,
    public portfolioName: string,
    public buy: number,
    public sell: number,
    public spread: number,
    public imageUrl: string
  ) { }
}
