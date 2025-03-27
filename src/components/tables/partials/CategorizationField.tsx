import React, { useContext, useState } from "react";
import type { Movement } from "../../../utils/types/Movement";
import {
  Button,
  Checkbox,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { categoryColor, type Category } from "../../../utils/types/Categories";
import {
  MovementsContext,
  MovementsDispatchContext,
} from "../../../utils/store/MovementsContext";
import { DefaultCategorizationDispatchContext } from "../../../utils/store/DefaultCategorizationContext";

import Icon from "@mdi/react";
import { mdiPencil } from "@mdi/js";
import { formatCurrency } from "../../../utils/helpers";
interface ICategorizationField {
  movement: Movement;
  categories: Category[];
}
const CategorizationField = ({
  movement,
  categories,
}: ICategorizationField) => {
  // State
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState<string | undefined>(movement.categorization?.name ?? undefined);
  const [subcategory, setSubcategory] = useState<string | undefined>(movement.categorization?.subcategory ?? undefined);
  const [similarMovements, setSimilarMovements] = useState<Movement[]>([]);
  const [updateAll, setUpdateAll] = useState<boolean>(false);
  const [defaultCategorization, setDefaultCategorization] =
    useState<boolean>(true);

  // Context
  const movements = useContext(MovementsContext);
  const movementsDispatch = useContext(MovementsDispatchContext);

  const defaultCategorizationDispatch = useContext(
    DefaultCategorizationDispatchContext
  );

  // Functions
  const handleEditCategory = () => {
    setUpdateAll(similarMovements.length > 1);
    setSimilarMovements(
      movements.filter((x) => x.description === movement.description)
    );
    onOpen();
  };

  const handleSelectCategory = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (e.target.value) {
      setCategory(e.target.value );
    } else {
      setCategory(undefined);
    }
  };

  const handleSaveCategory = () => {
    let sameDescriptionMovements: Movement[] = [];

    const updateCategory : Category = {name: category!, subcategory: subcategory}

    if (updateAll) {
      sameDescriptionMovements = similarMovements.map((x) => {
        return { ...x, categorization: updateCategory };
      });
    }
    const payload: Movement[] = updateAll
      ? sameDescriptionMovements
      : [{ ...movement, categorization: updateCategory }];
    movementsDispatch({ type: "UPDATE", payload });

    if (true) {
      defaultCategorizationDispatch({
        type: "UPDATE",
        payload: { key: movement.description, value: category },
      });
    }
    onClose();
  };

  const baseColor = categoryColor(
    movement.categorization ? movement.categorization : undefined
  );

  return (
    <>
      <Chip
        classNames={{
          base: `bg-${baseColor}-300 text-${baseColor}-900`,
        }}
        variant="flat"
        color={movement.categorization ? "secondary" : "default"}
        onClose={handleEditCategory}
        endContent={<Icon path={mdiPencil} size={0.7} />}
      >
        <span>
          {movement.categorization
            ? movement.categorization.name
            : "Sin categoría"}
        </span>
      </Chip>

      <Modal
        size="md"
        isOpen={isOpen}
        onClose={onClose}
        placement="top"
        backdrop="blur"
      >
        <ModalContent>
          <ModalBody className="m-3">
            <p className="mt-4">
              Seleccione una categoría para <br></br>
              {movement.description} {formatCurrency(movement.amount)}
            </p>
            <div className="flex flex-col gap-4 p-4">
              <Select
                size="sm"
                label={"Selecciona una categoria"}
                isRequired
                onChange={handleSelectCategory}
                defaultSelectedKeys={
                  movement.categorization && [movement.categorization?.name]
                }
              >
                {categories.map((category) => {
                  return (
                    <SelectItem key={category.name} value={category.name}>
                      {category.name}
                    </SelectItem>
                  );
                })}
              </Select>
              <Input type="text" label="Subcategoría" size="sm" value={subcategory} onValueChange={setSubcategory}></Input>
              <Checkbox
                defaultSelected={defaultCategorization}
                size="sm"
                onValueChange={setDefaultCategorization}
              >
                Usar esta categorización para futuros movimientos
              </Checkbox>
              {similarMovements?.length > 1 && (
                <Checkbox
                  defaultSelected={updateAll}
                  size="sm"
                  onValueChange={setUpdateAll}
                >
                  Actualizar {similarMovements.length} movimientos similares
                </Checkbox>
              )}
              <Button
                size="sm"
                color="primary"
                isDisabled={category === undefined}
                onPress={handleSaveCategory}
              >
                Guardar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategorizationField;
