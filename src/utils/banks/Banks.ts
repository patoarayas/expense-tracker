export interface Bank{
    code: BankCode
    description: string
    fileTypes : string[]
}

export enum BankCode{
    BANCO_DE_CHILE
}

export enum BankFileType{
    CREDITO = 'Crédito',
    DEBITO = 'Débito',
}

export const banks : Bank[] = [{code: BankCode.BANCO_DE_CHILE, description: 'Banco de Chile', fileTypes : [BankFileType.CREDITO]}]

