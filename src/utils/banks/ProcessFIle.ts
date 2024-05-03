import type { DefaultCategorization } from "../types/DefaultCategorization";
import type { Movement } from "../types/Movement";
import { BancoDeChile } from "./BancoDeChile";
import { BankCode, type Bank, banks, BankFileType } from "./Banks";

export const ProcessFile = (
  data: any[],
  bank: Bank,
  fileType: string,
  defaultCategorization: DefaultCategorization[]
): Movement[] => {
  switch (bank.code) {
    case BankCode.BANCO_DE_CHILE:
      if (fileType === BankFileType.CREDITO) {
        return BancoDeChile.processCreditMovements(data,defaultCategorization).movements;
      } 
      else if (fileType === BankFileType.DEBITO){
        return BancoDeChile.processDebitMovements(data,defaultCategorization);
      }
      else {
        throw Error("Unsuported bank file");
      }

    default:
      throw Error("Undefined bank code");
  }
};
