/* tslint:disable */

import { PortfolioProduct } from "./portfolio-product";

/* eslint-disable */
export interface Portfolio {
  default?: boolean;
  isdefault?:boolean;
  id?: string;
  name?: string;
  userId?: string;
  createdAt?: string;
  products?: PortfolioProduct[];
}
