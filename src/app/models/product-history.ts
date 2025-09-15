/* tslint:disable */
/* eslint-disable */
import { Product } from '../models/product';
export interface ProductHistory {
  askPrice?: number;
  bidPrice?: number;
  buyLimit?: number;
  createdAt?: string;
  id?: string;
  lastTradedPrice?: number;
  maxShiftPrice?: number;
  product?: Product;
  sellLimit?: number;
  updatedAt?: string;
}

export interface ProductHistoryGraphData {
  name: string;
  data: [string, number][]
  color: string
}