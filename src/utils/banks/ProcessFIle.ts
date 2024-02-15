import type { Movement } from "../types/Movement";
import { BancoDeChile } from "./BancoDeChile";
import { BankCode, type Bank, banks, BankFileType } from "./Banks";

export const ProcessFile = (
  data: any[],
  bank: Bank,
  fileType: string
): Movement[] => {
  switch (bank.code) {
    case BankCode.BANCO_DE_CHILE:
      if (fileType === BankFileType.CREDITO) {
        return BancoDeChile.processCreditMovements(data).movements;
      } else {
        throw Error("Unsuported bank file");
      }

    default:
      throw Error("Undefined bank code");
  }
};
