import React, { useContext, useState } from "react";
import type { Movement } from "../../../utils/types/Movement";
import {
  Button,
  Checkbox,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { categoryColor, type Category } from "../../../utils/types/Categories";
import { MovementsDispatchContext } from "../../../utils/store/MovementsContext";
import Icon from "@mdi/react";
import { mdiPencil } from "@mdi/js";

interface ICategorizationField {
  movements: Movement[];
  movement: Movement;
  categories: Category[];
}
const CategorizationField = ({
  movements,
  movement,
  categories,
}: ICategorizationField) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [similarMovements, setSimilarMovements] = useState<Movement[]>(
    movements.filter((x) => x.description === movement.description)
  );
  const [updateAll, setUpdateAll] = useState<boolean>(
    similarMovements.length > 1
  );

  const movementsDispatch = useContext(MovementsDispatchContext);

  const handleSelectCategory = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    console.log(e.target.value);
    if (e.target.value) {
      setCategory({ name: e.target.value });
    } else {
      setCategory(undefined);
    }
  };

  const handleSaveCategory = () => {
    let sameDescriptionMovements: Movement[] = [];
    if (updateAll) {
      sameDescriptionMovements = similarMovements.map((x) => {
        return { ...x, categorization: category };
      });
    }
    const payload: Movement[] = updateAll
      ? sameDescriptionMovements
      : [{ ...movement, categorization: category! }];
    movementsDispatch({ type: "UPDATE", payload });

    onClose()
  };

  return (
    <>
      <Chip
        classNames={{base: categoryColor(movement.categorization ? movement.categorization : undefined)}}
        variant="flat"
        color={movement.categorization
            ? "secondary"
            : "default"}
        onClose={onOpen}
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
          <ModalBody>
            <div className="flex flex-col gap-4 p-4">
              <Select
                size="sm"
                label={"Selecciona una categoria"}
                isRequired
                onChange={handleSelectCategory}
                defaultSelectedKeys={movement.categorization && [movement.categorization?.name]}
              >
                {categories.map((category) => {
                  return (
                    <SelectItem key={category.name} value={category.name}>
                      {category.name}
                    </SelectItem>
                  );
                })}
              </Select>
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
