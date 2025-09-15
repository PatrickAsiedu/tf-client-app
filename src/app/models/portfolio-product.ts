/* tslint:disable */
/* eslint-disable */
import { Portfolio } from '../models/portfolio';
import { Product } from '../models/product';
export interface PortfolioProduct {
  id?: string;
  portfolio?: Portfolio;
  price?: number;
  product?: Product;
  quantity?: number;
  value?: number;
}
