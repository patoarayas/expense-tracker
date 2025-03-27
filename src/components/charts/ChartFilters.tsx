import React, { useContext, useState } from "react";
import { MovementsContext } from "../../utils/store/MovementsContext";
import { Button, DateRangePicker,  type DateValue, type RangeValue } from "@nextui-org/react";
import type { Movement } from "../../utils/types/Movement";
import { dateStringToDate } from "../../utils/helpers";
import {I18nProvider} from "@react-aria/i18n";

interface IChartFilters {
  setMovements: (movements: Movement[]) => void;
}
const ChartFilters = ({ setMovements }: IChartFilters) => {
  const movements = useContext(MovementsContext);
  const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;


  const [dateRange, setDateRange] = useState<RangeValue<DateValue>>()
  const handleChangeFilters = () => {
    let result = [...movements];

    if (dateRange !== undefined && dateRange.start && dateRange.end) {
      result = result.filter((e) => {
        return (
          dateStringToDate(e.date) >= dateRange.start.toDate(tzid) &&
          dateStringToDate(e.date) <= dateRange.end.toDate(tzid)
        );
      });
    }
    setMovements(result);
  };


  return (
    <div>   
      <div className="flex flex-col md:flex-row m-3 md:m-4 gap-3 md:mx-32">
      <span className="md:text-center py-2">Filtros</span>
        <div className="col-span-2">
          <I18nProvider locale="es-Cl">
          <DateRangePicker value={dateRange} onChange={setDateRange} visibleMonths={2}></DateRangePicker>
          </I18nProvider>
        </div>
        <Button color="primary" onClick={handleChangeFilters}>Aplicar</Button>
      </div>
    </div>
  );
};

export default ChartFilters;
