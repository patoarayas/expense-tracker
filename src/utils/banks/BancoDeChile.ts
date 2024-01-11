import type { CreditSaldsAndMovements, Movement } from "../types/SaldAndMovements";

export const processCreditMovements = (data : any[]) : CreditSaldsAndMovements => {

    ///Columns 1-7 are metadata
    console.log(data)
    const card = data[2].__EMPTY_2;
    const name = data[0].__EMPTY_2;

    const dateStr : string = data[4].__EMPTY_5?.split(" ").at(1)
    const date =  new Date(dateStr)

    const saldAvailable = data[6].__EMPTY_1
    const saldUtilized = data[6].__EMPTY_4
    const saldTotal = data[6].__EMPTY_7

    // From column 9 starts movements
    const movementsArr = data.slice(9,data.length -1 )

    const movements : Movement[] = movementsArr.map(x => {


        const installmentsArr = x.__EMPTY_7.split("/")
        return {
            date: x.__EMPTY_1,
            origin: x.__EMPTY_2,
            description: x.__EMPTY_4,
            city:x.__EMPTY_6 ?? "SIN INFORMACIÓN",
            installments: {
                current: Number(installmentsArr.at(0)),
                total: Number(installmentsArr.at(1))
            },
            amount: x.__EMPTY_10,
            currency: "CLP",
            type:"EGRESS"
        }
    })

    const result : CreditSaldsAndMovements =  {
        card: card,
        name: name,
        date: date.toDateString(),
        sald: {
            available: saldAvailable,
            utilized: saldUtilized,
            total:saldTotal,
        },
        movements: movements
    }

    return result

}

