import type { DefaultCategorization } from "../types/DefaultCategorization";
import { SourceType, MovementType, type Movement } from "../types/Movement";
import type { CreditSaldsAndMovements } from "../types/SaldAndMovements";
import type { Bank } from "./Banks";

const processCreditMovements = (
  data: any[],
  defaultCategorization: DefaultCategorization[]
): CreditSaldsAndMovements => {
  ///Columns 1-7 are metadata
  const card = data[2].__EMPTY_2;
  const name = data[0].__EMPTY_2;

  const dateStr: string = data[4].__EMPTY_5?.split(" ").at(1);
  const date = new Date(dateStr);

  const saldAvailable = data[6].__EMPTY_1;
  const saldUtilized = data[6].__EMPTY_4;
  const saldTotal = data[6].__EMPTY_7;

  // From column 9 starts movements
  const movementsArr = data.slice(9, data.length - 1);

  const movements: Movement[] = movementsArr.map((x) => {
    const installmentsArr = x.__EMPTY_7.split("/");
    const amount = x.__EMPTY_10;

    const description = x.__EMPTY_4;
    const defaultCategory = defaultCategorization.find(
      (x) => x.key === description
    );
    let categoryName: string = "";
    if (defaultCategory) {
      categoryName = defaultCategory.value;
    }
    return {
      date: x.__EMPTY_1,
      source: { name: SourceType.CREDIT, description: x.__EMPTY_2 },
      description: description,
      origin: x.__EMPTY_6 ?? "SIN INFORMACIÓN",
      installments: {
        current: Number(installmentsArr.at(0)),
        total: Number(installmentsArr.at(1)),
      },
      amount: amount,
      currency: "CLP",
      type: amount > 0 ? MovementType.EXPENSE : MovementType.EXPENSE,
      categorization: defaultCategory ? { name: categoryName } : undefined,
    };
  });

  const result: CreditSaldsAndMovements = {
    card: card,
    name: name,
    date: date.toDateString(),
    sald: {
      available: saldAvailable,
      utilized: saldUtilized,
      total: saldTotal,
    },
    movements: movements.filter((x) => x.amount >= 0),
  };

  return result;
};

const processDebitMovements = (
  data: any[],
  defaultCategorization: DefaultCategorization[]
): Movement[] => {

    const account = data[2].__EMPTY_1;

    // From column 11 starts movements
    const movementsArr = data.slice(11, data.length - 1);
  
    const movements: Movement[] = movementsArr.map((x) => {

      const movementType = x.__EMPTY_3 ? MovementType.EXPENSE : MovementType.INCOME;

      const amount = movementType == MovementType.EXPENSE ? x.__EMPTY_3 : x.__EMPTY_4;
  
      const description = x.__EMPTY_1;
      const defaultCategory = defaultCategorization.find(
        (x) => x.key === description
      );
      let categoryName: string = "";
      if (defaultCategory) {
        categoryName = defaultCategory.value;
      }
      return {
        date: x.__EMPTY,
        source: { name: SourceType.DEBIT, description: account },
        description: description,
        origin: x.__EMPTY_2 ?? "SIN INFORMACIÓN",
        installments: {
          current: 1,
          total: 1,
        },
        amount: amount,
        currency: "CLP",
        type: movementType,
        categorization: defaultCategory ? { name: categoryName } : undefined,
      };
    });
  
    const result: Movement[] = movements.filter(x => x.type === MovementType.EXPENSE);
    return result;
};

export const BancoDeChile = {
  processCreditMovements,
  processDebitMovements
};
