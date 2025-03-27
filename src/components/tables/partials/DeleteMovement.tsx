import React, { useContext } from "react";
import type { Movement } from "../../../utils/types/Movement";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { MovementsDispatchContext } from "../../../utils/store/MovementsContext";

interface IDeleteMovement {
  movement: Movement;
}
const DeleteMovement = ({ movement }: IDeleteMovement) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useContext(MovementsDispatchContext);

  const handleDeleteMovement = () => {
    dispatch({type:'DELETE', payload: [movement]})
  };

  return (
    <>
      <div className="flex flex-row gap-1">
        <Button
        size="sm"
        isIconOnly
          color="danger"
          variant="ghost"
          onPress={onOpen}
        ><Icon path={mdiDelete} size={0.7} />
        </Button>
      </div>
      <Modal
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>¿Seguro deseas eliminar este movimiento?</ModalHeader>
          <ModalBody >
            <div className="flex flex-col md:flex-row gap-3 justify-center">
            <Button color="danger" onPress={handleDeleteMovement}>Eliminar</Button>
            <Button color="default" onPress={onClose}>Cancelar</Button>
            </div>
        
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteMovement;
