import React, {
  useState,
  type ChangeEvent,
  useReducer,
  useContext,
} from "react";
import { read, utils } from "xlsx";
import { MovementsDispatchContext } from "../../utils/store/MovementsContext";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { type Bank, banks } from "../../utils/banks/Banks";
import { ProcessFile } from "../../utils/banks/ProcessFIle";
interface IFileImport {
  onCloseModal: () => void;
  setFileImportResult: (fileImportResult: IFileImportResult) => void;
}
export interface IFileImportResult {
  result: boolean;
  message: string;
  movementsImported: number;
}
const FileImport = ({ onCloseModal , setFileImportResult}: IFileImport) => {
  const [file, setFile] = useState<File | null>(null);
  const [bank, setBank] = useState<Bank | undefined>(undefined);
  const [fileType, setFileType] = useState<string | undefined>(undefined);

  const dispatch = useContext(MovementsDispatchContext);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log(e.target.files);
    }
  };

  const processFile = async () => {
    if (file) {
      const workbook = read(await file.arrayBuffer());
      const processed = ProcessFile(
        utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]),
        bank!,
        fileType!
      );

      dispatch({ type: "ADD", payload: processed });

      setFileImportResult({ result: true, movementsImported: processed.length, message: "Ok"});

      onCloseModal();
    }
  };

  const handleSelectBank = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setBank(banks.find((x) => x.code.toString() === e.target.value));
  };

  const handleSelectFileType = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setFileType(e.target.value);
  };

  return (
    <div>
      <div className="mx-auto max-w-xs">
        <label
          htmlFor="example5"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Sube saldos y movimientos
        </label>
        <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
          <div className="space-y-1 text-center">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </div>
            <div className="text-gray-600">
              <span className="font-medium text-primary-500 hover:text-primary-700">
                Haz click
              </span>{" "}
              o arrastra un archivo
            </div>
            <p className="text-sm text-gray-500">
              <span>Tipos aceptados: </span>XLSX
            </p>
          </div>
          <input
            id="file"
            type="file"
            name="fileinput"
            className="sr-only"
            accept=".xls, .xlsx"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      {file  && (
        <div>
          <div>
            Archivo subido: <span>{file.name}</span>
          </div>
          <div className="grid grid-cols-1 gap-4 my-4">
            <Select
              className="col-span-1"
              size="sm"
              label={"Selecciona un banco"}
              isRequired
              onChange={handleSelectBank}
            >
              {banks.map((bank) => {
                return (
                  <SelectItem key={bank.code} value={bank.description}>
                    {bank.description}
                  </SelectItem>
                );
              })}
            </Select>

            {bank && (
              <Select
                className="col-span-1"
                size="sm"
                label={"Selecciona un tipo de archivo"}
                isRequired
                onChange={handleSelectFileType}
              >
                {bank.fileTypes.map((file) => {
                  return (
                    <SelectItem key={file} value={file}>
                      {file.toString()}
                    </SelectItem>
                  );
                })}
              </Select>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {file && bank && fileType && (
              <Button color="primary" size="md" onClick={processFile}>
                Procesar
              </Button>
            )}
          </div>
        </div>
      )}
   
    </div>
  );
};
export default FileImport;
