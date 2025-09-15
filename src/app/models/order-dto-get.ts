/* tslint:disable */
/* eslint-disable */
export interface OrderDtoGet {
  orderType: 'LIMIT' | 'MARKET';
  price?: number;
  product?: string;
  quantity?: number;
  side: 'BUY' | 'SELL';
}
