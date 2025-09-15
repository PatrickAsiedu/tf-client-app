import { Account } from "./account";
import { User } from "./user";

export interface CurrentUser extends User {
    account?: Account
}