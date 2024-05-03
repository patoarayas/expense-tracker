import React, { useContext, useState } from "react";
import { MovementsContext } from "../../utils/store/MovementsContext";
import { Button, Input } from "@nextui-org/react";
import DateInput from "../utils/DateInput";
import type { DateValueType } from "react-tailwindcss-datepicker";
import type { Movement } from "../../utils/types/Movement";
import { dateStringToDate } from "../../utils/helpers";

interface IChartFilters {
  setMovements: (movements: Movement[]) => void;
}
const ChartFilters = ({ setMovements }: IChartFilters) => {
  const movements = useContext(MovementsContext);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleChangeFilters = () => {
    let result = [...movements];

    if (startDate !== null && endDate !== null) {
      result = result.filter((e) => {
        return (
          dateStringToDate(e.date) >= startDate &&
          dateStringToDate(e.date) <= endDate
        );
      });
    }
    setMovements(result);
  };

  const handleSetDateFilter = (value: DateValueType) => {
    if (value) {
      setStartDate(new Date(value.startDate as string));
      setEndDate(new Date(value.endDate as string));
    }
  };
  return (
    <div>
      
      <div className="flex flex-row m-4 gap-3 mx-32">
      <span className="text-center py-2">Filtros</span>
        <div className="col-span-2">
          <DateInput
            onChange={handleSetDateFilter}
            showShortcuts
            showFooter
          ></DateInput>
        </div>
        <Button color="primary" onClick={handleChangeFilters}>Aplicar filtros</Button>
      </div>
    </div>
  );
};

export default ChartFilters;
