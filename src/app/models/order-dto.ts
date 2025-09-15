/* tslint:disable */
/* eslint-disable */
export interface OrderDto {
  portfolioId: string;
  price: number;
  product: string;
  quantity: number;
  side: 'BUY' | 'SELL';
  type: 'LIMIT' | 'MARKET';
  userId: string;
}
