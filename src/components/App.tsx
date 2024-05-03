import React, { useContext } from "react";
import {
  MovementsProvider,
} from "../utils/store/MovementsContext";
import Home from "./views/Home";
import { CategoriesProvider } from "../utils/store/CategoriesContext";
import { DefaultCategorizationProvider } from "../utils/store/DefaultCategorizationContext";

const App = () => {
  return (
    <React.StrictMode>
      <MovementsProvider>
        <CategoriesProvider>
          <DefaultCategorizationProvider>
            <Home />
          </DefaultCategorizationProvider>
        </CategoriesProvider>
      </MovementsProvider>
    </React.StrictMode>
  );
};

export default App;
