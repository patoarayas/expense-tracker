import type { Category } from "./Categories";

export interface Movement {
    date: string;
    source: {
        card: CardType;
        description: string;
    }
    description: string;
    origin: string;
    installments?: {
        current: number;
        total: number;
    }
    amount: number;
    currency: string;
    type: MovementType;
    categorization?: Category;
}



export enum MovementType {
    INCOME = "Ingreso",
    EXPENSE = "Gasto",
    NEUTRAL = "Neutral"
}

export enum CardType {
    CREDIT = "Crédito",
    DEBIT = "Débito"
}

export  interface MovementFilter {
    dateStart?: Date;
    dateEnd?: Date;
}
