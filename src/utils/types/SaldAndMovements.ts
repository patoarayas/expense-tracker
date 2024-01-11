export interface Movement {
    date: string;
    origin: string;
    description: string;
    city: string;
    installments: {
        current: number;
        total: number;
    }
    amount: number;
    currency: string;
    type: "INGRESS" | "EGRESS"
}

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