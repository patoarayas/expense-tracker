import React, { useState } from "react";
import Alert from "../../utils/Alert";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import AddMovement, { type IAddMovementResult } from "./AddMovement";

const AddMovementButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [result, setResult] = useState<IAddMovementResult>();
  const handleFileImportResult = (result: IAddMovementResult) => {
    setResult(result);
  };

  return (
    <>
      <div className="m-1">
        <Button key={"import"} onPress={onOpen} size="sm" color="primary">
          Agregar
        </Button>
      </div>
      {result && result.result && (
        <Alert>
          <p>Se cargó exitosamente el movimiento</p>
        </Alert>
      )}

      <Modal
        size="4xl"
        isOpen={isOpen}
        onClose={onClose}
        placement="top"
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>Agregar movimiento</ModalHeader>
          <ModalBody >
            <AddMovement />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddMovementButton;
