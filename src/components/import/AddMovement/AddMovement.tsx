import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  type Selection,
} from "@nextui-org/react";
import React, { useState, type ChangeEvent, useContext } from "react";
import {
  MovementType,
  type Movement,
  getMovementType,
  SourceType,
  getSourceType,
} from "../../../utils/types/Movement";
import { CategoriesContext } from "../../../utils/store/CategoriesContext";
import DateInput from "../../utils/DateInput";
import type { DateValueType } from "react-tailwindcss-datepicker";
export interface IAddMovementResult {
  result: boolean;
  message: string;
}

const AddMovement = () => {
  const movement: Movement | undefined = undefined;

  const categories = useContext(CategoriesContext);

  // Movement Type
  const movementTypes = Object.keys(MovementType).map((x) => {
    return { key: x, value: MovementType[x as keyof typeof MovementType] };
  });
  const [movementType, setMovementType] = useState<MovementType | undefined>(
    undefined
  );

  const handleSelectMovementType = (
    e: ChangeEvent<HTMLSelectElement>
  ): void => {
    const movementType = getMovementType(e.target.value);
    setMovementType(movementType);
  };

  // Source Type

  const sourceTypes = Object.keys(SourceType).map((x) => {
    return { key: x, value: SourceType[x as keyof typeof SourceType] };
  });
  const [sourceType, setSourceType] = useState<SourceType | undefined>(
    undefined
  );

  const handleSelectSourceType = (e: ChangeEvent<HTMLSelectElement>): void => {
    const movementType = getSourceType(e.target.value);
    setSourceType(movementType);
  };

  // categorization

  const [category, setCategory] = useState<string | undefined>(undefined);
  const [subcategory, setSubcategory] = useState<string | undefined>(undefined);
  const [defaultCategorization, setDefaultCategorization] =
    useState<boolean>(true);

  const handleSelectCategory = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (e.target.value) {
      setCategory(e.target.value);
    } else {
      setCategory(undefined);
    }
  };

  // Fecha

  const [date, setDate] = useState<DateValueType | null>();

  return (
    <form>
      <div className="flex flex-col gap-2 mx-2">
        <Input  label="Descripción" size="sm"></Input>
        <Input
          label="Monto"
          size="sm"
          type="number"
          min={0}
        ></Input>
        <div className="" >
          <DateInput
            value={date}
            onChange={(v) => setDate(v)}
            asSingle
            useRange={false}
            showFooter={false}
            showShortcuts={false}
          />
        </div>
        <Select  label="Origen" size="sm">
          {sourceTypes.map((x) => {
            return (
              <SelectItem key={x.value} value={x.value}>
                {x.value}
              </SelectItem>
            );
          })}
        </Select>
        <Select
          
          label="Tipo"
          onChange={handleSelectMovementType}
          size="sm"
        >
          {movementTypes.map((x) => {
            return (
              <SelectItem key={x.value} value={x.value}>
                {x.value}
              </SelectItem>
            );
          })}
        </Select>
        <div className="flex flex-row  gap-1">
          <Select
            size="sm"
            label={"Selecciona una categoria"}
            isRequired
            onChange={handleSelectCategory}
          >
            {categories.map((category) => {
              return (
                <SelectItem key={category.name} value={category.name}>
                  {category.name}
                </SelectItem>
              );
            })}
          </Select>
          <Input
            type="text"
            label="Subcategoría"
            size="sm"
            value={subcategory}
            onValueChange={setSubcategory}
          ></Input>
          <Checkbox
            className="col-span-3"
            defaultSelected={defaultCategorization}
            size="sm"
            onValueChange={setDefaultCategorization}
          >
            Usar esta categorización para futuros movimientos
          </Checkbox>
        </div>
      </div>
    </form>
  );
};

export default AddMovement;
