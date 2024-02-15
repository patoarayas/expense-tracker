import type { Movement } from "./Movement";

export interface CreditSaldsAndMovements {
    card: string
    name : string
    date : string
    sald : {
        available: number;
        utilized: number;
        total: number;
    }
    movements: Movement[]

}