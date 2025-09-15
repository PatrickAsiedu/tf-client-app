/* tslint:disable */
/* eslint-disable */
import { Portfolio } from '../models/portfolio';
import { Product } from '../models/product';
export interface Order {
  dateCreated?: string;
  createdAt?:string;
  description?: string;
  id?: string;
  portfolio?: Portfolio;
  price?: number;
  product?: Product;
  quantity?: number;
  side?: 'BUY' | 'SELL';
  status?:
    | 'PENDING'
    | 'OPEN'
    | 'FILLED'
    | 'PARTIALLY_FILLED'
    | 'CANCELLED'
    | 'FAILED';
  type?: 'LIMIT' | 'MARKET';
  userId?: string;
}
