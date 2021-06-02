import { Account } from "./Account";
import { Food } from "./Food";

export class Rating {
    ratingId: number;
    ratingLevel: number;
    food: Food;
    account: Account;
}