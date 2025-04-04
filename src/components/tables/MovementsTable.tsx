import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  MovementType,
  type Movement,
  type MovementFilter,
} from "../../utils/types/Movement";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";
import CategorizationField from "./partials/CategorizationField";
import { CategoriesContext } from "../../utils/store/CategoriesContext";
import { dateStringToDate } from "../../utils/helpers";
import DeleteMovement from "./partials/DeleteMovement";

interface IMovementsTable {
  movements: Movement[];
}
const MovementsTable = ({ movements }: IMovementsTable) => {
  const categories = useContext(CategoriesContext);

  const [filters, setFilters] = useState<MovementFilter>({
    dateStart: undefined,
    dateEnd: undefined,
  });

  const filterMovements = (
    movements: Movement[],
    filters: MovementFilter
  ): Movement[] => {
    let movArr = [...movements];
    if (filters.dateStart !== undefined) {
      movArr = movArr.filter(
        (x) => dateStringToDate(x.date) >= filters.dateStart!
      );
    }
    if (filters.dateEnd !== undefined) {
      movArr = movArr.filter(
        (x) => dateStringToDate(x.date) <= filters.dateEnd!
      );
    }
    return movArr;
  };

  const movementsToDisplay: Movement[] = useMemo((): Movement[] => {
    return filterMovements(movements, filters);
  }, [movements, filters]);

  const currencyFormatter = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  });

  const columns = [
    { id: "description", name: "Movimiento" },
    { id: "categorization", name: "Categoría" },
    { id: "date", name: "Fecha" },
    { id: "amount", name: "Monto" },
    { id: "type", name: "Tipo" },
    { id: "actions", name: "Acciones" },
  ];

  const colorByMovement = (
    movementType: MovementType
  ): "danger" | "success" | "default" => {
    switch (movementType.toString()) {
      case MovementType.EXPENSE.toString():
        return "danger";
      case MovementType.INCOME.toString():
        return "success";
      // case MovementType.NEUTRAL.toString():
      //   return "default";
      default:
        return "default";
    }
  };

  const renderCell = React.useCallback(
    (movement: Movement, columnKey: React.Key) => {

      switch (columnKey) {
        case "description":
          return (
            <div>
              <span className="block">{movement.description}</span>
              <span className="block font-normal">
                {movement.source.name.toString()}
              </span>
            </div>
          );
        case "categorization":
          return (
            <CategorizationField
              movement={movement}
              categories={categories}
            ></CategorizationField>
          );
        case "date":
          return <span>{movement.date}</span>;
        case "amount":
          return <span>{currencyFormatter.format(movement.amount)}</span>;
        case "type":
          return (
            <Chip variant="flat" color={colorByMovement(movement.type)}>
              {movement.type.toString()}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <DeleteMovement movement={movement}></DeleteMovement>
            </div>
          );
        default:
          return <>ERROR</>;
      }
    },
    []
  );

  return (
    <Table aria-label="Tabla con movimientos">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.id}
            align={column.id === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No hay movimientos"} items={movementsToDisplay}>
        {(item) => (
          <TableRow key={`mov_${item.date}_${item.description}_${item.amount}`}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MovementsTable;
