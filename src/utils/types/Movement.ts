import type { Category } from "./Categories";

export interface Movement {
  date: string;
  source: {
    name: SourceType;
    description?: string;
  };
  description: string;
  origin: string;
  installments?: {
    current: number;
    total: number;
  };
  amount: number;
  currency: string;
  type: MovementType;
  categorization?: Category;
}

export enum MovementType {
  INCOME = "Ingreso",
  EXPENSE = "Gasto",
  // NEUTRAL = "Neutral"
}

export function getMovementType(key: string): MovementType {
  switch (key) {
    case MovementType.EXPENSE:
      return MovementType.EXPENSE;
    case MovementType.INCOME:
      return MovementType.INCOME;
    default:
      throw Error("Unknown MovementType");
  }
}

export enum SourceType {
  CREDIT = "Crédito",
  DEBIT = "Débito",
  CASH = "Efectivo",
}
export function getSourceType(key: string): SourceType {
  switch (key) {
    case SourceType.CREDIT:
      return SourceType.CREDIT;
    case SourceType.DEBIT:
      return SourceType.DEBIT;
    case SourceType.CASH:
      return SourceType.CASH;
    default:
      throw Error("Unknown MovementType");
  }
}

export interface MovementFilter {
  dateStart?: Date;
  dateEnd?: Date;
}
