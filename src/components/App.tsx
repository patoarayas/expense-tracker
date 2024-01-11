import React from "react";
import FileUpload from "./FileUpload/FileUpload";
import MovementsTable from "./tables/MovementsTable";
import { MovementsProvider } from "../utils/store/MovementsContext";

const App = () => {
  return (
    <React.StrictMode>
      <MovementsProvider>
        <FileUpload />
        <MovementsTable />
      </MovementsProvider>
    </React.StrictMode>
  );
};

export default App;
