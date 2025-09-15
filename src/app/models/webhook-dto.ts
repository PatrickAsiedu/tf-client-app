/* tslint:disable */
/* eslint-disable */
export interface WebhookDto {
  cumPrx?: number;
  cumQty?: number;
  exchange?: 'MAL1' | 'MAL2';
  orderID?: string;
  orderType?: 'LIMIT' | 'MARKET';
  price?: number;
  product?: string;
  qty?: number;
  side?: 'SELL' | 'BUY';
  timestamp?: string;
}
