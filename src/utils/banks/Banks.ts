export interface Bank {
  code: BankCode;
  description: string;
  fileTypes: string[];
}

export enum BankCode {
  BANCO_DE_CHILE,
}

export enum BankFileType {
  CREDITO_NO_FACTURADO = "Crédito - Movimientos no facturados",
  CREDITO_FACTURADO = "Crédito - Movimientos facturados",
  DEBITO = "Débito",
}

export const banks: Bank[] = [
  {
    code: BankCode.BANCO_DE_CHILE,
    description: "Banco de Chile",
    fileTypes: [BankFileType.CREDITO_NO_FACTURADO, BankFileType.CREDITO_FACTURADO, BankFileType.DEBITO],
  },
];
