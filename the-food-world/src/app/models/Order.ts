import { Account } from "./Account";

export class Order {
    orderId: number;
    account: Account;
    total: number;
    deliveryAddress: string;
    methodPayment: number;
}