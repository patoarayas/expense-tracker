import React, { useContext } from "react";
import { MovementsContext } from "../../utils/store/MovementsContext";
import MovementsTable from "../tables/MovementsTable";
import FileImportButton from "../FileImport/FileImportButton";

const Home = () => {
  const movements = useContext(MovementsContext);
  return (
    <>
      <FileImportButton></FileImportButton>
      <MovementsTable movements={movements} />
    </>
  );
};

export default Home;
