/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface Account {
  active?: boolean;
  availableBalance?: number;
  createdAt?: string;
  id?: string;
  lockedAmount?: number;
  updatedAt?: string;
  user?: User;
}
