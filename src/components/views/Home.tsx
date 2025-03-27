import React, { useContext } from "react";
import { MovementsContext } from "../../utils/store/MovementsContext";
import MovementsTable from "../tables/MovementsTable";
import FileImportButton from "../import/FileImport/FileImportButton";
import Treemap from "../charts/Treemap";
import AddMovementButton from "../import/AddMovement/AddMovementButton";

const Home = () => {
  const movements = useContext(MovementsContext);
  return (
    <>
      
      <Treemap></Treemap>
      <div className="px-6">
        <div className=" m-4 flex flex-row justify-end">
        {/* <AddMovementButton></AddMovementButton> */}
        <FileImportButton></FileImportButton>
        </div>
      
        <MovementsTable movements={movements} />
      </div>
    </>
  );
};

export default Home;
