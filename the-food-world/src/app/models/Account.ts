import { Customer } from "./Customer";

export class Account {
    accountId: number;
    accountName: string;
    accountPassword: string;
    accountEmail: string;
    accountStatus: number;
    accountRegisterTime: string;
    accountLoginTime: string;
    customer: Customer;
}