import React, { useState, type ChangeEvent, useReducer, useContext } from "react";
import { read, utils } from "xlsx";
import type { Banks } from "../../utils/Banks";
import type { CreditSaldsAndMovements, Movement } from "../../utils/types/SaldAndMovements";
import { processCreditMovements } from "../../utils/banks/BancoDeChile";
import { reducer, setInitialState } from "../../utils/store/MovementsReducer";
import { MovementsDispatchContext } from "../../utils/store/MovementsContext";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const dispatch = useContext(MovementsDispatchContext)

  const [saldAndMovements, setSaldAndMovements] = useState<
    CreditSaldsAndMovements | undefined
  >(undefined);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log(e.target.files);
    }
  };

  const processFile = async () => {
    if (file) {
      const workbook = read(await file.arrayBuffer());
      const processed = processCreditMovements(
        utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
      );

      dispatch({ type: "ADD", payload: processed.movements });
      setSaldAndMovements(processed);
    }
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
      {file && (
        <div>
          <div>
            Archivo subido: <span>{file.name}</span>
          </div>
          <div>TODO: ELEGIR banco</div>
          <div className="flex flex-wrap justify-center gap-5">
            <button
              type="button"
              className="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
              onClick={processFile}
            >
              Procesar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default FileUpload;
