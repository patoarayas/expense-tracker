import React, { forwardRef, useState } from "react";
import Datepicker, { type DateValueType } from "react-tailwindcss-datepicker";

interface IDateInput {
  value?: DateValueType;
  asSingle?: boolean;
  onChange: (v: DateValueType) => void;
  useRange?: boolean;
  placeholder?: string;
  showShortcuts?: boolean;
  showFooter?:boolean;
  readonly?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}
const DateInput = (props: IDateInput) => {
  const handleSelectDate = (value: DateValueType | null) => {
    props.onChange(value);
  };

  return (
    <Datepicker 
      containerClassName={"relative w-full z-30 p-0"}
      inputClassName={"h-12 gap-0 hover:bg-default-200 focus:bg-default-100 bg-default-100 relative transition-all duration-300 py-1.5 pl-3 pr-3 w-full --border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide  text-sm placeholder-foreground-500  disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none "}
      value={props.value ?? { startDate: new Date(), endDate: null }}
      onChange={handleSelectDate}
      asSingle={props.asSingle}
      useRange={props.useRange}
      placeholder={props.placeholder ?? "Seleccionar fecha"}
      displayFormat="DD-MM-YYYY"
      showShortcuts={props.showShortcuts}
      showFooter={props.showFooter}
      readOnly={props.readonly}
      disabled={props.disabled}
      minDate={props.minDate}
      maxDate={props.maxDate}
      i18n={"es"}
      configs={{
        shortcuts: {
          today: "Hoy",
          yesterday: "Ayer",
          past: (period) => `Los ${period} días anteriores`,
          currentMonth: "Este mes",
          pastMonth: "El mes pasado",
        },
        footer: {
          cancel: "Cancelar",
          apply: "Aplicar",
        },
      }}
    ></Datepicker>
  );
};

export default DateInput;
