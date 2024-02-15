import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import FileImport, { type IFileImportResult } from "./FileImport";
import Alert from "../utils/Alert";
const FileImportButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [result, setResult] = useState<IFileImportResult>();
  const handleFileImportResult = (result: IFileImportResult) => {
    setResult(result);
   
  };

  return (
    <>
      <div className="m-4 flex flex-row justify-end">
        <Button key={"import"} onPress={onOpen} size="sm" color="primary">
          Importar movimientos
        </Button>
      </div>
      {result && result.result && (
        <Alert >
          <p>Se cargaron {result.movementsImported} movimientos</p>
        </Alert>
      )}

      <Modal
        size="4xl"
        isOpen={isOpen}
        onClose={onClose}
        placement="top"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>Importar movimientos</ModalHeader>
          <ModalBody>
            <FileImport
              onCloseModal={onClose}
              setFileImportResult={handleFileImportResult}
            ></FileImport>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileImportButton;
