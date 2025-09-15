/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
export interface User {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  active?: boolean;
  authorities?: Array<GrantedAuthority>;
  createdAt?: string;
  credentialsNonExpired?: boolean;
  dob?: string;
  email?: string;
  enabled?: boolean;
  id?: string;
  name?: string;
  password?: string;
  role?: 'USER' | 'ADMIN';
  updatedAt?: string;
  username?: string;
}
