import React, { useContext } from "react";
import FileImport from "./FileImport/FileImport";
import MovementsTable from "./tables/MovementsTable";
import {
  MovementsContext,
  MovementsProvider,
} from "../utils/store/MovementsContext";
import Home from "./views/Home";
import { CategoriesProvider } from "../utils/store/CategoriesContext";

const App = () => {
  return (
    <React.StrictMode>
      <MovementsProvider>
        <CategoriesProvider>
          <Home />
        </CategoriesProvider>
      </MovementsProvider>
    </React.StrictMode>
  );
};

export default App;
